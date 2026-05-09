# React + Vite

## Assistant IA Hugging Face

Le chatbot appelle l'endpoint serveur `/api/chat`, qui utilise Hugging Face sans exposer la cle API dans le navigateur.

1. Creez un token gratuit sur Hugging Face.
2. Copiez `.env.example` vers `.env.local`.
3. Renseignez :

```bash
HF_TOKEN=VOTRE_TOKEN_HUGGING_FACE
HF_MODEL=meta-llama/Llama-3.1-8B-Instruct
```

En local, `npm run dev` expose aussi `/api/chat` grace a la configuration Vite. Sans endpoint serveur ou sans token, le chatbot garde ses reponses locales de secours.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
