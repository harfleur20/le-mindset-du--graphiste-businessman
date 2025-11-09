import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./Preview.css";

// Configuration du worker PDFJS
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

const Preview = () => {
  const pdfUrl = "/livres/mindset.pdf";
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log("PDF chargé avec succès:", numPages, "pages");
    setNumPages(numPages);
    setPageNumber(1);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error("Erreur de chargement PDF:", error);
    setIsLoading(false);
    setError(
      "Impossible de charger le PDF. Vérifiez que le fichier existe dans public/livres/"
    );
  };

  const nextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const reloadPdf = () => {
    setIsLoading(true);
    setError(null);
    setPageNumber(1);
  };

  return (
    <section className="preview-section" id="preview">
      <div className="container">
        <h2 className="section-title">Feuilletez le Livre</h2>
        <p className="section-subtitle">
          Découvrez les premières pages gratuitement
        </p>

        <div className="pdf-container">
          {isLoading && (
            <div className="pdf-loading">
              <div className="spinner"></div>
              <p>Chargement du livre en cours...</p>
            </div>
          )}

          {error && (
            <div className="pdf-error">
              <div className="error-icon">📚</div>
              <h3>Livre non disponible</h3>
              <p>{error}</p>
              <div className="error-solutions">
                <p>Pour résoudre le problème :</p>
                <ul>
                  <li>
                    Vérifiez que le fichier <strong>mindset.pdf</strong> existe
                    dans le dossier <code>public/livres/</code>
                  </li>
                  <li>Assurez-vous que le PDF n'est pas corrompu</li>
                  <li>Vérifiez votre connexion internet</li>
                </ul>
                <div className="error-actions">
                  <button onClick={reloadPdf} className="btn btn-primary">
                    ↻ Réessayer
                  </button>
                  <a href="#achat" className="btn btn-secondary">
                    📖 Voir les options d'achat
                  </a>
                </div>
              </div>
            </div>
          )}

          {!isLoading && !error && (
            <>
              <div className="pdf-viewer">
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={null}
                >
                  <Page
                    pageNumber={pageNumber}
                    width={Math.min(600, window.innerWidth - 40)}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </div>

              <div className="pdf-controls">
                <button
                  onClick={prevPage}
                  disabled={pageNumber <= 1}
                  className="nav-btn"
                >
                  ← Page précédente
                </button>

                <span className="page-info">
                  Page {pageNumber} sur {numPages || "--"}
                </span>

                <button
                  onClick={nextPage}
                  disabled={pageNumber >= (numPages || 1)}
                  className="nav-btn"
                >
                  Page suivante →
                </button>
              </div>

              {/* Message pour inciter à acheter */}
              {pageNumber >= 3 && numPages && pageNumber < numPages && (
                <div className="preview-cta">
                  <div className="cta-icon">✨</div>
                  <h4>Ces premières pages vous plaisent ?</h4>
                  <p>
                    Le livre complet contient <strong>{numPages} pages</strong>{" "}
                    de stratégies avancées !
                  </p>
                  <a href="#achat" className="btn btn-primary">
                    Obtenir le livre complet
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Preview;
