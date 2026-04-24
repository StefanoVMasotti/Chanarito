import { useEffect, useState } from "react";
import { getClubsRequest } from "../api/clubs";
import { useNavigate } from "react-router-dom";
import { createRegistrationRequest } from "../api/registrations";
import { getCategoriesRequest } from "../api/categories";
import { getMyRegistrationsRequest } from "../api/registrations";
import { deleteRegistrationRequest } from "../api/registrations";
import confirmDelete from "../utils/confirm.jsx";
import { toast } from "react-toastify";

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

  const handleDelete = (id) => {
    confirmDelete(async () => {
      const res = await deleteRegistrationRequest(id);

      setMessage(res.message);
      toast.info(res.message);
      fetchRegistrations();
    });
  };

  const handleLogout = () => {
    if (!confirm("¿Seguro que querés cerrar sesión?")) return;

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

    fetchClubs();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const cats = await getCategoriesRequest();
      setCategories(cats);
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="min-h-screen bg-blue-950 p-6">
      <div className="max-w-3xl mx-auto text-white bg-white/20 p-6 rounded-2xl shadow flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Bienvenido {club?.name}</h1>

        <h2 className="text-xl font-semibold mb-3">Clubes registrados:</h2>

        {loading ? (
          <div className="flex justify-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          <ul>
            {clubs.map((c) => (
              <li key={c.id} className="border p-3 mb-2 rounded-lg bg-white/10">
                <strong>{c.name}</strong> - {c.email}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-row">
          <button
            onClick={handleLogout}
            className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
          {club?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Ir a Admin
            </button>
          )}
        </div>
      </div>
      <form
        onSubmit={handleRegister}
        className="mt-6 max-w-3xl mx-auto text-white bg-white/20 p-6 rounded-2xl shadow flex flex-col items-center justify-center"
      >
        <h3 className="font-semibold mb-2">Inscribirse a categoría</h3>
        <div>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="border p-2 mr-2 rounded bg-white/20 text-black/50"
          >
            <option value="">Seleccionar categoría</option>

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
      <div className="mt-6 max-w-3xl mx-auto text-white bg-white/20 p-6 rounded-2xl shadow">
        <h3 className="font-semibold mb-2">Mis inscripciones</h3>

        {loadingCats ? (
          <div className="flex justify-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : registrations.length === 0 ? (
          <p>No estás inscripto en ninguna categoría</p>
        ) : (
          <ul>
            {registrations.map((r) => (
              <li
                key={r.id}
                className="border p-3 mb-2 rounded-lg flex justify-between items-center"
              >
                <span>Categoría {r.year}</span>

                <button
                  onClick={() => handleDelete(r.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
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
