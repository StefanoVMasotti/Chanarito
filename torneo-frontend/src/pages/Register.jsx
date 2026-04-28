import { useState } from "react";
import { toast } from "react-toastify";
import { registerRequest } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
import { validateRegister } from "../utils/validations.jsx";
import Cards from "../components/Cards.jsx"

function Register() {
  const [form, setForm] = useState({
    name: "",
    coordinator_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateRegister(form);

    if (error) {
      toast.error(error);
      return;
    }

    const res = await registerRequest(form);

    if (res.message === "Club registrado correctamente") {
      toast.success(res.message);
      navigate("/login");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-950 via-blue-900 to-blue-700">
      <Cards>
      <form
        onSubmit={handleSubmit}
        className="w-80"
        >
        <h2 className="text-xl font-bold mb-4 text-center">Registro de Club</h2>

        <input
          type="text"
          name="name"
          placeholder="Nombre del club"
          onChange={handleChange}
          className="w-full text-white mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />

        <input
          type="text"
          name="coordinator_name"
          placeholder="Nombre del Coordinador"
          onChange={handleChange}
          className="w-full text-white mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full text-white mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full text-white mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />

        <button className="w-full bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-950 transition">
          Registrarse
        </button>
        <p className="text-sm mt-3 text-white text-center">
          ¿Tenés cuenta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 font-bold underline cursor-pointer"
            >
            Iniciar sesión
          </span>
        </p>
      </form>
            </Cards>
    </div>
  );
}

export default Register;
