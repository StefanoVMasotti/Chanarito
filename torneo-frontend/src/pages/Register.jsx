import { useState } from "react";
import { toast } from "react-toastify";
import { registerRequest } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

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

    const res = await registerRequest(form);

    if (res.message === "Club registrado correctamente") {
      toast.success(res.message);
      navigate("/");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-950">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 p-6 rounded-2xl shadow-md w-80 text-white"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Registro de Club</h2>

        <input
          type="text"
          name="name"
          placeholder="Nombre del club"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          name="coordinator_name"
          placeholder="Nombre del Coordinador"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
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
    </div>
  );
}

export default Register;
