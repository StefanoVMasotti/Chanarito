import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/2020(1).jpg";
import img2 from "../assets/2019(1).jpeg";
import img3 from "../assets/2018.jfif";
import img4 from "../assets/2017(1).jfif";
import img5 from "../assets/2016(1).jpg";

function Landing() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <section className="flex flex-col items-center justify-center text-center mt-16 px-4">
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">
            {" "}
            Chañarito 2027
          </h1>
          <p className="mt-6 text-white/80 text-lg">
            Bienvenidos a la página oficial del encuentro deportivo
            <strong> Chañarito</strong>, realizado en el Club Social y Deportivo
            Mutual Chañarense, en la localidad de Chañar Ladeado.
          </p>

          <p className="mt-4 text-white/80">
            Aquí podrán encontrar fotos de los niños participando de los
            encuentros, información acerca del evento y, si usted es Coordinador
            o Profesor de un club, podrá registrarse e inscribir las categorías
            con las que participará.
          </p>
          <div className="mt-8 flex gap-4 bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow">
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition"
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
        </div>
      </section>
      <section className="mt-24 w-full text-center">
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-white mb-4">
            Galería de Fotos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            <div className="relative group">
              <img
                src={img1}
                className="rounded-xl h-48 w-full object-cover transition duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">Categoría 2020</span>
              </div>
            </div>
            <div className="relative group">
              <img
                src={img2}
                className="rounded-xl h-48 w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">Categoría 2019</span>
              </div>
            </div>
            <div className="relative group">
              <img
                src={img3}
                className="rounded-xl h-48 w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">Categoría 2018</span>
              </div>
            </div>
            <div className="relative group">
              <img
                src={img4}
                className="rounded-xl h-48 w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">Categoría 2017</span>
              </div>
            </div>
            <div className="relative group">
              <img
                src={img5}
                className="rounded-xl h-48 w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">Categoría 2016</span>
              </div>
            </div>
            <div className="relative group">
              <img
                src={img5}
                className="rounded-xl h-48 w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">Categoría 2015</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Landing;
