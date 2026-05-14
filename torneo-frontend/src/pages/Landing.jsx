import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/2020(1).jpg";
import img2 from "../assets/2019(1).jpeg";
import img3 from "../assets/2018.jfif";
import img4 from "../assets/2017(1).jfif";
import img5 from "../assets/2016(1).jpg";
import img6 from "../assets/2015(1).jfif";

const gallery = [
  { src: img1, label: "Categoria 2020" },
  { src: img2, label: "Categoria 2019" },
  { src: img3, label: "Categoria 2018" },
  { src: img4, label: "Categoria 2017" },
  { src: img5, label: "Categoria 2016" },
  { src: img6, label: "Categoria 2015" },
];

function Landing() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <section className="max-w-6xl mx-auto mt-6 md:mt-12 px-2">
        <div className="glass-panel rounded-3xl p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Chanarito 2027
          </h1>
          <p className="mt-5 text-blue-100/90 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Bienvenidos a la pagina oficial del encuentro deportivo Chanarito,
            organizado por el Club Social y Deportivo Mutual Chanarense en
            Chanar Ladeado.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate("/register")}
              className="primary-btn px-7 py-3 rounded-xl font-semibold"
            >
              Registrarse
            </button>
            <button
              onClick={() => navigate("/login")}
              className="secondary-btn px-7 py-3 rounded-xl font-semibold"
            >
              Iniciar sesion
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-10 px-2">
        <div className="glass-panel rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
            Galeria de Fotos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((item) => (
              <div key={item.label} className="relative group overflow-hidden rounded-2xl">
                <img
                  src={item.src}
                  alt={item.label}
                  className="h-52 w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-black/10 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                  <span className="text-white font-semibold tracking-wide">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Landing;

