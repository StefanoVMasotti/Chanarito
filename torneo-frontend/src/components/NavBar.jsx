import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const goTo = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <nav className="glass-panel sticky top-0 z-50 mx-2 mt-2 rounded-2xl px-3 py-3 md:mx-3 md:mt-3 md:px-6">
      <div className="flex items-center justify-between">
        <div className="hidden md:flex gap-3 font-semibold">
          <button
            className="secondary-btn text-sm md:text-base px-4 py-2 rounded-xl"
            onClick={() => goTo("/")}
          >
            Home
          </button>
          <button
            className="secondary-btn text-sm md:text-base px-4 py-2 rounded-xl"
            onClick={() => goTo("/information")}
          >
            Informacion
          </button>
        </div>

        <div className="hidden md:flex gap-2">
          <button
            onClick={() => goTo("/register")}
            className="primary-btn text-sm md:text-base px-4 py-2 rounded-xl font-semibold"
          >
            Registrarse
          </button>

          <button
            onClick={() => goTo("/login")}
            className="secondary-btn text-sm md:text-base px-4 py-2 rounded-xl"
          >
            Iniciar Sesion
          </button>
        </div>

        <button
          type="button"
          className="md:hidden secondary-btn px-3 py-2 rounded-xl"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Abrir menu"
          aria-expanded={mobileOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden mt-3 grid grid-cols-1 gap-2">
          <button
            className="secondary-btn text-sm px-3 py-2 rounded-xl w-full"
            onClick={() => goTo("/")}
          >
            Home
          </button>
          <button
            className="secondary-btn text-sm px-3 py-2 rounded-xl w-full"
            onClick={() => goTo("/information")}
          >
            Informacion
          </button>
          <button
            onClick={() => goTo("/register")}
            className="primary-btn text-sm px-3 py-2 rounded-xl font-semibold w-full"
          >
            Registrarse
          </button>
          <button
            onClick={() => goTo("/login")}
            className="secondary-btn text-sm px-3 py-2 rounded-xl w-full"
          >
            Iniciar Sesion
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
