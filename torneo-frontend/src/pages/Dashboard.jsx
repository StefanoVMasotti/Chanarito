import { useEffect, useState } from "react";
import { getClubsRequest } from "../api/clubs";
import { useNavigate } from "react-router-dom";
import { createRegistrationRequest } from "../api/registrations";
import { getCategoriesRequest } from "../api/categories";
import { getMyRegistrationsRequest } from "../api/registrations";
import { deleteRegistrationRequest } from "../api/registrations";
import confirmDelete from "../utils/confirm.jsx";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";
import logout from "../utils/logout.jsx";
import Cards from "../components/Cards.jsx";

function Dashboard({ setToken }) {
  const CLUB_STORAGE_KEY = "club:v1";
  const club = JSON.parse(
    localStorage.getItem(CLUB_STORAGE_KEY) || localStorage.getItem("club"),
  );
  const [clubs, setClubs] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();
  const registeredIds = registrations.map((r) => r.category_id);
  const [loading, setLoading] = useState(true);
  const [loadingCats, setLoadingCats] = useState(true);

  const fetchRegistrations = async () => {
    try {
      const data = await getMyRegistrationsRequest();
      setRegistrations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCats(false);
    }
  };

  const fetchClubs = async () => {
    try {
      const data = await getClubsRequest();
      setClubs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    const cats = await getCategoriesRequest();
    setCategories(cats);
  };

  const handleDelete = async (id) => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;

    await deleteRegistrationRequest(id);
    await Swal.fire({
      title: "Eliminado",
      text: "La inscripcion fue eliminada",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
    fetchRegistrations();
  };

  const handleLogout = async () => {
    const confirmed = await logout();
    if (!confirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem(CLUB_STORAGE_KEY);
    localStorage.removeItem("club");
    toast.success("Cerrando sesion");
    setTimeout(() => {
      navigate("/");
    }, 2500);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (categoryId === "") return toast.info("Seleccione una categoria");

    await createRegistrationRequest({ category_id: categoryId });
    fetchRegistrations();
    toast.success("Inscripcion exitosa");
    setCategoryId("");
  };

  useEffect(() => {
    Promise.all([fetchRegistrations(), fetchClubs(), fetchData()]);
  }, []);

  return (
    <div className="app-bg p-4 md:p-6">
      <Cards>
        <h1 className="text-3xl font-extrabold mb-1 text-center">Bienvenido {club?.name}</h1>
        <p className="text-blue-100/85 mb-6 text-center">Gestiona tus equipos y categorias desde tu panel</p>

        <div className="w-full flex flex-wrap gap-2 mb-5 justify-center">
          <button onClick={handleLogout} className="secondary-btn px-4 py-2 rounded-xl">
            Cerrar sesion
          </button>
          {club?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="primary-btn px-4 py-2 rounded-xl font-semibold"
            >
              Panel Administrador
            </button>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-3 w-full">Clubes registrados</h2>
        {loading ? (
          <Spinner />
        ) : (
          <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {clubs.map((c) => (
              <li key={c.id} className="glass-panel rounded-2xl p-4">
                <p className="font-semibold text-base">{c.name}</p>
                <p className="text-sm text-blue-100/80">{c.email}</p>
              </li>
            ))}
          </ul>
        )}
      </Cards>

      <Cards>
        <form onSubmit={handleRegister} className="w-full">
          <h3 className="font-semibold mb-3 text-center text-xl">Inscribirse a categoria</h3>
          <div className="flex flex-col md:flex-row gap-2">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="field"
            >
              <option value="">Seleccionar categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} disabled={registeredIds.includes(cat.id)}>
                  {cat.year} {registeredIds.includes(cat.id) ? "(Ya inscripto)" : ""}
                </option>
              ))}
            </select>

            <button className="primary-btn px-4 py-3 rounded-xl font-semibold md:min-w-48">
              Inscribirme
            </button>
          </div>
        </form>
      </Cards>

      <div className="glass-panel max-w-4xl mx-auto my-3 p-6 md:p-8 rounded-3xl">
        <h3 className="text-center font-semibold mb-3 text-xl">Mis inscripciones</h3>

        {loadingCats ? (
          <Spinner />
        ) : registrations.length === 0 ? (
          <p className="text-blue-100/90">No estas inscripto en ninguna categoria</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {registrations.map((r) => (
              <li key={r.id} className="glass-panel rounded-2xl p-4 flex justify-between items-center">
                <span className="font-medium">Categoria {r.year}</span>
                <button
                  onClick={async () => {
                    await handleDelete(r.id);
                  }}
                  className="secondary-btn px-3 py-2 rounded-lg"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

