import { getRelevantKnowledge } from "../src/data/chatKnowledge.js";
import https from "node:https";

const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
const DEFAULT_MODEL = "meta-llama/Llama-3.1-8B-Instruct";

const sendJson = (response, body, status = 200) => {
  response.status(status).json(body);
};

const makeAnswerConcise = (answer) => {
  const cleanAnswer = answer
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+(?:au|sur|via)?\s*(?:ce\s+)?(?:lien|page de paiement)\s*:\s*/gi, " ")
    .replace(/\s+:\s*(?=[.!?]|$)/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (cleanAnswer.length <= 650) {
    return cleanAnswer;
  }

  const sentences = cleanAnswer.match(/[^.!?]+[.!?]+/g) || [cleanAnswer];
  const shortAnswer = sentences.slice(0, 4).join(" ").trim();

  if (shortAnswer.length <= 650) {
    return shortAnswer;
  }

  const clipped = shortAnswer.slice(0, 620);
  const lastSpace = clipped.lastIndexOf(" ");

  return `${clipped.slice(0, lastSpace > 500 ? lastSpace : 620).trim()}.`;
};

const getActionsForMessage = (message, answer) => {
  const userText = message.toLowerCase();
  const assistantText = answer.toLowerCase();
  const actions = [];

  const addAction = (label, url, type = "primary") => {
    if (!actions.some((action) => action.url === url)) {
      actions.push({ label, url, type });
    }
  };

  const hasPurchaseIntent = /acheter|achat|commander|commande|payer|paiement|checkout|prendre|obtenir|je veux|je prends|j'achète|j'achete|lien|où acheter|ou acheter|comment acheter|comment commander/.test(userText);
  const asksPriceOrPromo = /prix|co[uû]te|combien|tarif|mindset2026|réduction|reduction|promo|code|-50/.test(userText);
  const asksContact = /whatsapp|contact|appeler|parler|conseiller|support|livraison physique/.test(userText);
  const asksOfferChoice = /quelle offre|offre adaptée|offre me conseille|premium|ebook|version physique/.test(userText);
  const shouldShowActions = hasPurchaseIntent || asksPriceOrPromo || asksContact || asksOfferChoice;

  if (!shouldShowActions) {
    return [];
  }

  if (/ebook|digital|pdf|mindset2026|réduction|reduction|-50|promo|code/.test(`${userText} ${assistantText}`)) {
    addAction(
      "Acheter l'Ebook",
      "https://we.academiecreatif.com/le-mindset-du-graphiste-businessman/checkout",
      "primary"
    );
  }

  if (/premium|coaching|masterclass|accompagnement|communauté|communaute/.test(`${userText} ${assistantText}`)) {
    addAction(
      "Voir l'offre Premium",
      "https://we.academiecreatif.com/offre-package-or/checkout",
      "primary"
    );
  }

  if (hasPurchaseIntent || asksContact || /version physique|livraison physique|whatsapp/.test(userText)) {
    addAction(
      "Parler sur WhatsApp",
      "https://wa.me/message/FCSKO4BE4CKQK1",
      "whatsapp"
    );
  }

  return actions.slice(0, 2);
};


const requestWithLocalTlsFallback = (url, options) =>
  new Promise((resolve, reject) => {
    const request = https.request(url, {
      method: options.method,
      headers: options.headers,
      rejectUnauthorized: false
    }, (apiResponse) => {
      let body = "";

      apiResponse.on("data", (chunk) => {
        body += chunk;
      });

      apiResponse.on("end", () => {
        resolve({
          ok: apiResponse.statusCode >= 200 && apiResponse.statusCode < 300,
          status: apiResponse.statusCode,
          json: async () => JSON.parse(body || "{}")
        });
      });
    });

    request.on("error", reject);
    request.write(options.body);
    request.end();
  });

const requestHuggingFace = async (url, options) => {
  try {
    return await fetch(url, options);
  } catch (error) {
    const isLocalTlsIssue = error.cause?.code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE";
    const canRetryLocally = process.env.NODE_ENV !== "production";

    if (!isLocalTlsIssue || !canRetryLocally) {
      throw error;
    }

    return requestWithLocalTlsFallback(url, options);
  }
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return sendJson(response, { error: "Method not allowed" }, 405);
  }

  const token = process.env.HF_TOKEN || process.env.HUGGING_FACE_TOKEN;
  const model = process.env.HF_MODEL || DEFAULT_MODEL;
  const message = String(request.body?.message || "").trim();
  const history = Array.isArray(request.body?.history)
    ? request.body.history
      .slice(-6)
      .map((item) => `${item.sender === "user" ? "Client" : "Assistant"}: ${String(item.text || "").replace(/<[^>]*>/g, " ").trim()}`)
      .join("\n")
    : "";

  if (!message) {
    return sendJson(response, { error: "Message vide" }, 400);
  }

  if (!token) {
    return sendJson(response, { error: "HF_TOKEN manquant" }, 503);
  }

  const knowledge = getRelevantKnowledge(message);

  const systemPrompt = `
Tu es Eveline, l'assistante commerciale de Francis Kenne pour le livre "Le Mindset du Graphiste Businessman".
Réponds comme une vraie humaine dans un tchat : naturel, chaleureux, direct, jamais robotique.
Utilise uniquement les informations fournies dans les données ci-dessous.
Si l'information n'est pas disponible, dis-le simplement et propose de contacter l'équipe sur WhatsApp.
Garde les réponses utiles et adaptées : court si la question est simple, un peu plus complet si le client demande une liste, des faits ou des détails.
Réponds avec des paragraphes courts. Si tu donnes plusieurs points, mets-les obligatoirement sur des lignes séparées avec des tirets, jamais dans un seul paragraphe.
Ne colle jamais les liens complets dans le texte de réponse. Les boutons d'action seront ajoutés séparément.
Tu dois agir comme une vraie conseillère commerciale : écouter le besoin, reformuler brièvement, rassurer, puis suggérer l'offre la plus adaptée.
Quand le visiteur hésite, pose au maximum une question utile au lieu de réciter tout le catalogue.
Utilise les idées fortes du livre pour convaincre : vendre sa valeur, vendre une solution plutôt qu'un service, fidéliser, automatiser, se protéger, et voir l'IA comme un assistant.
Ne mentionne jamais le code RELANCEIO. Le code promo actuel est MINDSET2026, avec -50% sur l'Ebook.
Ne promets jamais un revenu garanti. Présente les résultats comme un objectif possible avec méthode, discipline et application.
Ne réponds pas avec des listes longues, des cartes, du HTML ou un catalogue complet sauf si le client demande les prix ou les offres.
Ne récite pas tous les thèmes du livre. Choisis les bénéfices les plus pertinents pour la question, puis termine par une question courte ou une suggestion d'offre si c'est naturel.
Pour une question comme "en tant que graphiste comment ce livre pourrait m'aider", explique concrètement comment le livre aide à vendre sa valeur, mieux traiter les clients, fixer ses prix et structurer son activité, puis termine par une question ou une suggestion douce.
Pour convaincre un visiteur hésitant, suis cette structure naturelle sans l'annoncer :
1. Reconnais sa situation ou sa douleur.
2. Donne 2 transformations concrètes que le livre peut lui apporter.
3. Relie ces transformations à un passage/idée du livre.
4. Oriente vers l'offre adaptée : Ebook pour commencer vite à petit budget avec MINDSET2026 ; Premium pour coaching, masterclass et accompagnement.
5. Termine par une question simple qui aide à qualifier son besoin.
Évite les phrases génériques comme "ce livre est fait pour vous" si elles ne sont pas accompagnées d'un bénéfice concret.

Données disponibles :
${knowledge}

Historique récent :
${history || "Aucun historique."}
`.trim();

  try {
    const hfResponse = await requestHuggingFace(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 220,
        temperature: 0.5
      })
    });

    const data = await hfResponse.json();

    if (!hfResponse.ok) {
      return sendJson(response, { error: data?.error || "Erreur Hugging Face" }, hfResponse.status);
    }

    const answer = data?.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return sendJson(response, { error: "Réponse vide de Hugging Face" }, 502);
    }

    const conciseAnswer = makeAnswerConcise(answer);

    return sendJson(response, {
      answer: conciseAnswer,
      actions: getActionsForMessage(message, conciseAnswer)
    });
  } catch (error) {
    return sendJson(response, { error: error.message || "Erreur serveur" }, 500);
  }
}
