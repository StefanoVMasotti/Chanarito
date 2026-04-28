import { useState } from "react";
import { loginRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateLogin } from "../utils/validations.jsx";
import Cards from "../components/Cards.jsx"

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

    const error = validateLogin(form);

    if (error) {
      toast.error(error);
      return;
    }

    try {
      const res = await loginRequest(form);

      if (res.token) {
        //Guardo el Token y el club en el localStorage
        localStorage.setItem("token", res.token);
        localStorage.setItem("club", JSON.stringify(res.club));
        toast.dismiss();
        toast.success("Login exitoso!", { autoClose: 2000 });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);

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
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-950 via-blue-900 to-blue-700">
      <Cards>

      <form
        onSubmit={handleSubmit}
        className="w-80"
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
            </Cards>
    </div>
  );
}

export default Login;
