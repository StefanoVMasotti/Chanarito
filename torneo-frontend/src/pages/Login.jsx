import { useState } from "react";
import { loginRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
        //Guardo el Token y el club en el localStorage
        localStorage.setItem("token", res.token);
        localStorage.setItem("club", JSON.stringify(res.club));
        toast.dismiss();
        toast.success("Login exitoso!");
        setTimeout(() => {
          //Antes actualizaba el estado del token, pero ahora no es necesario porque el ProtectedRoute se basa en el localStorage
          //setToken(res.token);
          navigate("/dashboard");
        }, 3000);

        console.log("Login exitoso");
      } else {
        toast.dismiss();
        toast.info(res.message);
        console.log("Error:", res.message);
      }
    } catch (error) {
      toast.error("Error en BD");
      console.error("Error en login", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-950">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 p-8 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-2xl text-white font-bold mb-6 text-center">
          Torneo Chañarito
        </h2>

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
          Ingresar
        </button>
        <p className="text-sm mt-3 text-white text-center">
          ¿No tenés cuenta?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 font-bold underline cursor-pointer"
          >
            Registrate
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
