import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="glass-panel sticky top-0 z-50 mx-3 mt-3 rounded-2xl px-4 py-3 md:px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 md:gap-3 font-semibold">
          <button
            className="secondary-btn text-sm md:text-base px-4 py-2 rounded-xl"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            className="secondary-btn text-sm md:text-base px-4 py-2 rounded-xl"
            onClick={() => navigate("/information")}
          >
            Informacion
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/register")}
            className="primary-btn text-sm md:text-base px-4 py-2 rounded-xl font-semibold"
          >
            Registrarse
          </button>

          <button
            onClick={() => navigate("/login")}
            className="secondary-btn text-sm md:text-base px-4 py-2 rounded-xl"
          >
            Iniciar Sesion
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

