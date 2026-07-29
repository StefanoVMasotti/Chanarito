import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Carousel from "../components/Carousel";
import { categoryPhotos } from "../data/categoryPhotos";

function CategoryGallery() {
  const { year } = useParams();
  const navigate = useNavigate();
  const photos = categoryPhotos[year];

  return (
    <MainLayout>
      <section className="max-w-4xl mx-auto mt-6 md:mt-12 px-2">
        <button
          onClick={() => navigate("/")}
          className="secondary-btn px-4 py-2 rounded-xl text-sm mb-4 cursor-pointer"
        >
          &larr; Volver
        </button>

        <div className="glass-panel rounded-3xl p-6 md:p-8">
          {photos ? (
            <>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 text-center">
                Categoría {year}
              </h1>
              <Carousel images={photos} alt={`Categoría ${year}`} />
            </>
          ) : (
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold text-white/60 mb-4">
                Categoría no encontrada
              </h1>
              <p className="text-white/40 mb-6">
                No hay fotos disponibles para el año {year}.
              </p>
              <button
                onClick={() => navigate("/")}
                className="primary-btn px-6 py-3 rounded-xl font-semibold cursor-pointer"
              >
                Volver al inicio
              </button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}

export default CategoryGallery;
