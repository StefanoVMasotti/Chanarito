import { useState } from "react";
import { loginRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateLogin } from "../utils/validations.jsx";
import Cards from "../components/Cards.jsx";

function Login({ setToken }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const CLUB_STORAGE_KEY = "club:v1";
  const navigate = useNavigate();

  const listenForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveUserProfile = async (e) => {
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
        localStorage.setItem(CLUB_STORAGE_KEY, JSON.stringify(res.club));
        const club = JSON.parse(localStorage.getItem(CLUB_STORAGE_KEY));
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
        <form onSubmit={saveUserProfile} className="w-80">
          <h2 className="text-2xl text-white font-semibold mb-6 text-center">
            Torneo Chañarito
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={listenForm}
            className="w-full text-white mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={listenForm}
            className="w-full text-white mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />

          <button className="w-full bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-950 transition">
            Ingresar
          </button>
          <p className="text-sm mt-3 text-white text-center">
            ¿No tenés cuenta?
            <button
              onClick={() => navigate("/register")}
              className="text-blue-400 font-bold underline cursor-pointer"
            >
              Registrate
            </button>
          </p>
        </form>
      </Cards>
    </div>
  );
}

export default Login;
