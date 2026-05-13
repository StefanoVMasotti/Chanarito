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
  const club = JSON.parse(localStorage.getItem("club"));
  const [clubs, setClubs] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();
  const registeredIds = registrations.map((r) => r.category_id);
  const [message, setMessage] = useState("");
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

    const res = await deleteRegistrationRequest(id);
    await Swal.fire({
      title: "Eliminado",
      text: "La inscripción fue eliminada",
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
    localStorage.removeItem("club");
    toast.success("Cerrando Sesión");
    //setToken(null); // No es necesario actualizar el estado del token porque el ProtectedRoute se basa en el localStorage
    setTimeout(() => {
      navigate("/");
    }, 2500);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (categoryId === "") return toast.info("Seleccione una categoría");

    const res = await createRegistrationRequest({
      category_id: categoryId,
    });

    fetchRegistrations();
    toast.success("Inscripción Exitosa!");
    setCategoryId("");
  };

  useEffect(() => {
    Promise.all([fetchRegistrations(), fetchClubs(), fetchData()]);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-950 via-blue-900 to-blue-700 p-6">
      <Cards>
        <h1 className="text-2xl font-semibold mb-4">Bienvenido {club?.name}</h1>
        <h2 className="text-xl font-medium mb-3">Clubes registrados:</h2>

        {loading ? (
          <Spinner />
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {clubs.map((c) => (
              <li
                key={c.id}
                className="bg-white/10 p-3 rounded-lg flex justify-between items-center hover:bg-white/20 transition duration-200 hover:scale-[1.02]"
              >
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-stone-300">{c.email}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-row gap-2 mt-4">
          <button
            onClick={handleLogout}
            className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>
          {club?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Panel Administrador
            </button>
          )}
        </div>
      </Cards>
      <Cards>
        <form onSubmit={handleRegister} className="">
          <h3 className="font-semibold mb-2 text-center">
            Inscribirse a categoría
          </h3>
          <div>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="border p-2 mr-2 rounded bg-white/20 text-white"
            >
              <option value="" className="bg-black/20 text-black">
                Seleccionar categoría
              </option>

              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                  disabled={registeredIds.includes(cat.id)}
                  className="bg-black/20 text-black"
                >
                  {cat.year}{" "}
                  {registeredIds.includes(cat.id) ? "(Ya inscripto)" : ""}
                </option>
              ))}
            </select>

            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
              Inscribirme
            </button>
          </div>
        </form>
      </Cards>

      <div className="max-w-3xl mx-auto my-2 text-white bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-lg">
        <h3 className="text-center font-semibold mb-2">Mis inscripciones</h3>

        {loadingCats ? (
          <Spinner />
        ) : registrations.length === 0 ? (
          <p>No estás inscripto en ninguna categoría</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {registrations.map((r) => (
              <li
                key={r.id}
                className="bg-white/10 p-3 rounded-lg flex justify-between items-center hover:bg-white/20 transition duration-200 hover:scale-[1.02]"
              >
                <span className="font-medium">Categoría {r.year}</span>

                <button
                  onClick={async () => {
                    await handleDelete(r.id);
                  }}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg"
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
