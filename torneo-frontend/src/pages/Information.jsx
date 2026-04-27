import MainLayout from "../layouts/MainLayout";
import chañarense from "../assets/chañarense.png";
import Cards from "../components/Cards.jsx";
import chañarense2 from "../assets/Chañarense.jpeg";

function Information() {
  return (
    <MainLayout>
      <Cards>
        <h1 className="text-2xl font-bold mb-4">Información del torneo</h1>
        <img
          src={chañarense}
          alt="Chañarito 2027"
          className="mx-auto my-4 rounded-lg shadow-lg"
        />
        <p className="mb-4">
          Bienvenidos al Chañarito 2027, un evento deportivo que reúne a clubes
          de fútbol de toda la región para competir en un ambiente de comodidad
          y pasión por el deporte mas reconocido. Nuestro torneo se celebra
          anualmente en el hermoso pueblo de Chañar Ladeado, Santa Fe.
        </p>
        <p className="mb-4">
          Esta es una oportunidad única para que los clubes locales y regionales
          muestren su talento, fortalezcan sus lazos comunitarios y disfruten de
          la emoción del fútbol. Con categorías para todas las edades y niveles
          de habilidad, nuestro torneo es inclusivo y celebra la diversidad del
          deporte.
        </p>
        <p className="mb-4">
          Además de la competencia en el campo, el Chañarito ofrece Servicio de
          Buffet y Kiosko, música y un parque hermoso para disfrutar de un dia
          inolvidable. Es un evento que promueve la unión de la comunidad a
          través del deporte y la diversión.
        </p>
        <p className="mb-4">
          Invitamos a todos los clubes de fútbol a unirse a nosotros en esta
          celebración anual del deporte. Ya sea que seas un club establecido o
          un equipo emergente, el Chañarito es el lugar perfecto para competir,
          aprender y disfrutar del fútbol en su máxima expresión. ¡Esperamos
          verlos en el campo!
        </p>
      </Cards>
      <Cards>
        <h2 className="text-xl underline font-bold mb-4">
          Organización del Predio
        </h2>
        <img src={chañarense2} alt="Chañarito 2027" />
      </Cards>
    </MainLayout>
  );
}

export default Information;
