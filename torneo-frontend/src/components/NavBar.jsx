import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center bg-white/30 shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="flex gap-4 font-semibold text-gray-700">
        <button
          className="text-white/80 mr-2 p-1 rounded hover:text-white hover:outline transition"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          className="text-white/80 mr-2 p-1 rounded hover:text-white hover:outline transition"
          onClick={() => navigate("/informacion")}
        >
          Información
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => navigate("/register")}
          className="text-white bg-blue-800 px-4 py-2 rounded-xl hover:bg-blue-900 transition"
        >
          Registrarse
        </button>

        <button
          onClick={() => navigate("/login")}
          className="text-blue-800 border border-blue-800 px-4 py-2 rounded-xl hover:bg-blue-800 hover:text-white transition"
        >
          Iniciar Sesión
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
