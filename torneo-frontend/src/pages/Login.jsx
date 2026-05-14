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
        localStorage.setItem("token", res.token);
        localStorage.setItem(CLUB_STORAGE_KEY, JSON.stringify(res.club));
        toast.dismiss();
        toast.success("Login exitoso!", { autoClose: 2000 });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.dismiss();
        toast.info(res.message);
      }
    } catch (error) {
      toast.error("Error en BD");
      console.error("Error en login", error);
    }
  };

  return (
    <div className="app-bg flex items-center justify-center min-h-screen px-4">
      <Cards>
        <form onSubmit={saveUserProfile} className="w-full max-w-sm">
          <h2 className="text-3xl font-extrabold mb-2 text-center tracking-tight">
            Torneo Chanarito
          </h2>
          <p className="text-center text-[15px] text-blue-100/85 mb-7">
            Inicia sesion para administrar tus inscripciones
          </p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={listenForm}
            className="field mb-4"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={listenForm}
            className="field mb-5"
          />

          <button className="primary-btn w-full p-3 rounded-xl font-semibold">
            Ingresar
          </button>
          <p className="text-sm mt-4 text-blue-100 text-center">
            No tenes cuenta?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-200 font-bold underline cursor-pointer"
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

