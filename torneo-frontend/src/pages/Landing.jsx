import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <section className="flex flex-col items-center justify-center text-center mt-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white/90">
          Chañarito 2027
        </h1>
        <p className="mt-6 max-w-2xl text-white/80 text-lg">
          Bienvenidos a la página oficial del encuentro deportivo
          <strong> Chañarito</strong>, realizado en el Club Social y Deportivo
          Mutual Chañarense, en la localidad de Chañar Ladeado.
        </p>

        <p className="mt-4 max-w-2xl text-white/80">
          Aquí podrán encontrar fotos de los niños participando de los
          encuentros, información acerca del evento y, si usted es Coordinador o
          Profesor de un club, podrá registrarse e inscribir las categorías con
          las que participará.
        </p>
        <div className="mt-8 p-4 rounded-xl flex gap-4 bg-white/30">
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-800 text-white px-6 py-2 rounded-xl hover:bg-blue-900 transition"
          >
            Registrarse
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-blue-800 text-blue-800 px-6 py-2 rounded-xl hover:bg-blue-800 hover:text-white transition"
          >
            Iniciar Sesión
          </button>
        </div>
        <section className="mt-20 p-4 rounded-xl text-center bg-white/30">
          <h2 className=" text-white/80 text-2xl font-semibold">
            Próximamente Galeria de Fotos
          </h2>
          <h6 className="text-white/80"> Categoría 2020</h6>
          <h6 className="text-white/80"> Categoría 2019</h6>
          <h6 className="text-white/80"> Categoría 2018</h6>
          <h6 className="text-white/80"> Categoría 2017</h6>
          <h6 className="text-white/80"> Categoría 2016</h6>
          <h6 className="text-white/80"> Categoría 2015</h6>
        </section>
      </section>
    </MainLayout>
  );
}

export default Landing;
