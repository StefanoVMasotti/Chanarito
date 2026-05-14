import MainLayout from "../layouts/MainLayout";
import chanarense from "../assets/chañarense.png";
import Cards from "../components/Cards.jsx";
import chanarense2 from "../assets/Chañarense.jpeg";

function Information() {
  return (
    <MainLayout>
      <Cards>
        <h1 className="text-3xl font-extrabold mb-4 text-center">
          Informacion del torneo
        </h1>
        <img
          src={chanarense}
          alt="Chanarito 2027"
          className="mx-auto my-4 rounded-2xl shadow-lg border border-white/20"
        />
        <div className="space-y-4 text-blue-50/95 leading-relaxed">
          <p>
            Chanarito 2027 reune clubes de futbol de la region para competir en
            un entorno de comunidad, juego limpio y pasion por el deporte.
          </p>
          <p>
            El torneo se realiza en Chanar Ladeado, Santa Fe, con categorias
            para diferentes edades y una experiencia pensada para familias,
            entrenadores y chicos.
          </p>
          <p>
            Ademas de los partidos, el predio ofrece buffet, kiosko y espacios
            para disfrutar toda la jornada.
          </p>
        </div>
      </Cards>

      <Cards>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Organizacion del Predio
        </h2>
        <img
          src={chanarense2}
          alt="Predio Chanarito"
          className="rounded-2xl border border-white/20"
        />
      </Cards>
    </MainLayout>
  );
}

export default Information;
