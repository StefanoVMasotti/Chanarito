function Footer() {
  const links = {
    clubInstagram:
      "https://www.instagram.com/csdmchoficial?igsh=bWFudzdmOW9oYWp6",
    clubFacebook: "https://www.facebook.com/chanarense.web/",
    clubWhatsapp: "https://wa.me/03468514705",
    svmLinkedin: "https://www.linkedin.com/in/stefano-v-masotti-044a70363/",
    svmInstagram:
      "https://www.instagram.com/csdmchoficial?igsh=bWFudzdmOW9oYWp6",
    svmGithub: "https://github.com/StefanoVMasotti",
  };

  return (
    <footer className="mx-2 md:mx-3 mb-3 mt-6 glass-panel rounded-2xl p-5 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-2">Club Chañarense</h3>
          <p className="text-sm text-blue-100/90 mb-3">
            Chañarito - Futbol infantil y comunidad.
          </p>
          <p className="text-sm text-blue-100/90 mb-3">
            Ubicación: Chañar Ladeado, Santa Fe, Argentina
          </p>
          <div className="flex gap-2 flex-wrap">
            <a
              href={links.clubInstagram}
              className="secondary-btn px-3 py-1 rounded-lg text-sm flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
            <a
              href={links.clubFacebook}
              className="secondary-btn px-3 py-1 rounded-lg text-sm flex items-center gap-1"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.9v3h2.7v8h2.9Z" />
              </svg>
            </a>
            <a
              href={links.clubWhatsapp}
              className="secondary-btn px-3 py-1 rounded-lg text-sm flex items-center gap-1"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20 4a10 10 0 0 0-17 9l-1 4 4-1A10 10 0 1 0 20 4Zm-8 16a8 8 0 0 1-4-1.1l-.3-.2-2.3.6.6-2.2-.2-.3A8 8 0 1 1 12 20Zm4.5-6c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.6.1l-.5.7c-.2.2-.3.2-.6.1a6.6 6.6 0 0 1-2-1.2 7.5 7.5 0 0 1-1.4-1.8c-.1-.2 0-.4.1-.5l.3-.4.2-.4c.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3c-.2.2-.8.8-.8 2 0 1.2.8 2.4 1 2.6.1.2 1.7 2.7 4.2 3.7.6.3 1 .4 1.4.5.6.2 1 .2 1.4.1.4-.1 1.3-.6 1.4-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.4-.3Z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Creado por SVM</h3>
          <p className="text-sm text-blue-100/90 mb-3">
            Soluciones digitales y desarrollo a medida.
          </p>
          <div className="flex gap-2 flex-wrap mb-3">
            <a
              href={links.svmLinkedin}
              className="secondary-btn px-3 py-1 rounded-lg text-sm flex items-center gap-1"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M6.94 8.5A1.72 1.72 0 1 1 7 5.06a1.72 1.72 0 0 1-.06 3.44ZM5.5 9.9h2.9V19H5.5V9.9Zm4.7 0h2.8v1.2h.1c.4-.7 1.4-1.5 2.9-1.5 3.1 0 3.7 2 3.7 4.7V19h-2.9v-4.1c0-1 0-2.2-1.4-2.2-1.4 0-1.6 1.1-1.6 2.2V19h-2.9V9.9Z" />
              </svg>
            </a>
            <a
              href={links.svmInstagram}
              className="secondary-btn px-3 py-1 rounded-lg text-sm flex items-center gap-1"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
            <a
              href={links.svmGithub}
              className="secondary-btn px-3 py-1 rounded-lg text-sm flex items-center gap-1"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5V19c-3 .7-3.6-1.3-3.6-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6 0-.6 0-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.4-1.1.7-1.3-2.4-.3-5-1.2-5-5.3 0-1.2.4-2.1 1-2.9-.1-.2-.5-1.4.1-2.8 0 0 .8-.3 2.9 1.1a10 10 0 0 1 5.2 0c2.1-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.6.1 2.8.6.8 1 1.7 1 2.9 0 4.1-2.5 5-5 5.3.4.3.8 1 .8 2.1V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
          </div>
          <p className="text-xs text-blue-100/75">
            © {new Date().getFullYear()} SVM - Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
