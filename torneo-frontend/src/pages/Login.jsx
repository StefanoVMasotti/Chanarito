import { useState } from "react";
import { loginRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const [form, setForm] = useState({
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

    try {
      const res = await loginRequest(form);

      if (res.token) {
        // Guardo el Token y el club en el localStorage
        localStorage.setItem("token", res.token);
        localStorage.setItem("club", JSON.stringify(res.club));

        // Antes actualizaba el estado del token, pero ahora no es necesario porque el ProtectedRoute se basa en el localStorage
        // setToken(res.token);
        navigate("/dashboard");

        console.log("Login exitoso");
      } else {
        console.log("Error:", res.message);
      }
    } catch (error) {
      console.error("Error en login", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Torneo Chañarito ⚽
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button className="w-full bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-700 transition">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
