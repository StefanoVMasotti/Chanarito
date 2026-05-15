import { useEffect, useMemo, useState } from "react";
import { getClubsRequest, updateClubRequest } from "../api/clubs";
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
  const [sessionClub, setSessionClub] = useState(
    JSON.parse(localStorage.getItem(CLUB_STORAGE_KEY) || localStorage.getItem("club")),
  );
  const [clubs, setClubs] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [editingOwnClub, setEditingOwnClub] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    coordinator_name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();
  const registeredIds = registrations.map((r) => r.category_id);
  const [loading, setLoading] = useState(true);
  const [loadingCats, setLoadingCats] = useState(true);

  const ownClub = useMemo(
    () => clubs.find((c) => c.id === sessionClub?.id),
    [clubs, sessionClub?.id],
  );

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

  const openEditModal = () => {
    if (!ownClub) return;
    setEditForm({
      name: ownClub.name || "",
      coordinator_name: ownClub.coordinator_name || "",
      email: ownClub.email || "",
      phone: ownClub.phone || "",
    });
    setEditingOwnClub(true);
  };

  const handleUpdateOwnClub = async (e) => {
    e.preventDefault();

    if (!editForm.name || !editForm.coordinator_name || !editForm.email || !editForm.phone) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    const updated = await updateClubRequest(sessionClub.id, editForm);

    if (updated?.id) {
      const updatedSessionClub = {
        ...sessionClub,
        name: updated.name,
        email: updated.email,
      };

      localStorage.setItem(CLUB_STORAGE_KEY, JSON.stringify(updatedSessionClub));
      setSessionClub(updatedSessionClub);
      setEditingOwnClub(false);
      toast.success("Datos del club actualizados");
      fetchClubs();
    } else {
      toast.error(updated?.message || "No se pudo actualizar el club");
    }
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
        <h1 className="text-3xl font-extrabold mb-1 text-center">
          Bienvenido {sessionClub?.name}
        </h1>
        <p className="text-blue-100/85 mb-6 text-center">
          Gestiona tus equipos y categorias desde tu panel
        </p>

        <div className="w-full flex flex-wrap gap-2 mb-5 justify-center">
          <button
            onClick={handleLogout}
            className="secondary-btn px-4 py-2 rounded-xl"
          >
            Cerrar sesion
          </button>
          {sessionClub?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="primary-btn px-4 py-2 rounded-xl font-semibold"
            >
              Panel Administrador
            </button>
          )}
        </div>

        {ownClub && (
          <div className="w-full mb-4">
            <h2 className="text-xl font-semibold mb-3">Mi club</h2>
            <div className="glass-panel rounded-2xl p-4 flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-base">{ownClub.name}</p>
                <p className="text-sm text-blue-100/80">{ownClub.email}</p>
                <p className="text-sm text-blue-100/80">Tel: {ownClub.phone || "Sin telefono"}</p>
              </div>
              <button
                onClick={openEditModal}
                className="secondary-btn px-3 py-2 rounded-lg text-sm"
                title="Editar club"
              >
                Editar
              </button>
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold mb-3 w-full">Clubes registrados</h2>
        {loading ? (
          <Spinner />
        ) : (
          <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {clubs.map((c) => (
              <li key={c.id} className="glass-panel rounded-2xl p-4">
                <p className="font-semibold text-base">{c.name}</p>
              </li>
            ))}
          </ul>
        )}
      </Cards>

      <Cards>
        <form onSubmit={handleRegister} className="w-full">
          <h3 className="font-semibold mb-3 text-center text-xl">
            Inscribirse a categoria
          </h3>
          <div className="flex flex-col md:flex-row gap-2">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="field"
            >
              <option value="">Seleccionar categoria</option>
              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                  disabled={registeredIds.includes(cat.id)}
                >
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
        <h3 className="text-center font-semibold mb-3 text-xl">
          Mis inscripciones
        </h3>

        {loadingCats ? (
          <Spinner />
        ) : registrations.length === 0 ? (
          <p className="text-blue-100/90">
            No estas inscripto en ninguna categoria
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {registrations.map((r) => (
              <li
                key={r.id}
                className="glass-panel rounded-2xl p-4 flex justify-between items-center"
              >
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

      {editingOwnClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Editar mi club</h3>
              <button
                onClick={() => setEditingOwnClub(false)}
                className="secondary-btn px-3 py-1 rounded-lg"
              >
                Cerrar
              </button>
            </div>

            <form onSubmit={handleUpdateOwnClub} className="space-y-3">
              <input
                className="field"
                placeholder="Nombre del club"
                value={editForm.name}
                onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))}
              />
              <input
                className="field"
                placeholder="Nombre del coordinador"
                value={editForm.coordinator_name}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, coordinator_name: e.target.value }))
                }
              />
              <input
                className="field"
                placeholder="Email"
                value={editForm.email}
                onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))}
              />
              <input
                className="field"
                placeholder="Telefono"
                value={editForm.phone}
                onChange={(e) => setEditForm((p) => ({ ...p, phone: e.target.value }))}
              />
              <button className="primary-btn w-full px-4 py-3 rounded-xl font-semibold">
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
