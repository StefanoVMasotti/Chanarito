import { useState } from "react";
import { loginRequest } from "../api/auth";

function Login({ setToken }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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

        // Actualizo el estado del token en el componente padre
        setToken(res.token);

        console.log("Login exitoso");
      } else {
        console.log("Error:", res.message);
      }
    } catch (error) {
      console.error("Error en login", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

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

        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-800">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
