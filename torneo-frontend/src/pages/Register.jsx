import { useState } from "react";
import { toast } from "react-toastify";
import { registerRequest } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
import { validateRegister } from "../utils/validations.jsx";
import Cards from "../components/Cards.jsx";

function Register() {
  const [form, setForm] = useState({
    name: "",
    coordinator_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const listenForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveUserProfile = async (e) => {
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
    <div className="app-bg flex items-center justify-center min-h-screen px-4">
      <Cards>
        <form onSubmit={saveUserProfile} className="w-full max-w-sm">
          <h2 className="text-3xl font-extrabold mb-2 text-center tracking-tight">
            Registro de Club
          </h2>
          <p className="text-center text-[15px] text-blue-100/85 mb-7">
            Crea tu cuenta para participar del torneo
          </p>

          <input
            type="text"
            name="name"
            placeholder="Nombre del club"
            onChange={listenForm}
            className="field mb-4"
          />

          <input
            type="text"
            name="coordinator_name"
            placeholder="Nombre del coordinador"
            onChange={listenForm}
            className="field mb-4"
          />

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
            Registrarse
          </button>
          <p className="text-sm mt-4 text-blue-100 text-center">
            Ya tenes cuenta?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-200 font-bold underline cursor-pointer"
            >
              Iniciar sesion
            </button>
          </p>
        </form>
      </Cards>
    </div>
  );
}

export default Register;

