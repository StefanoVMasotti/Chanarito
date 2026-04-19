import { useEffect, useState } from "react";
import { getClubsRequest } from "../api/clubs";
import { useNavigate } from "react-router-dom";
import { createRegistrationRequest } from "../api/registrations";
import { getCategoriesRequest } from "../api/categories";
import { getMyRegistrationsRequest } from "../api/registrations";
import { deleteRegistrationRequest } from "../api/registrations";

function Dashboard({ setToken }) {
  const club = JSON.parse(localStorage.getItem("club"));
  const [clubs, setClubs] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();
  const registeredIds = registrations.map((r) => r.category_id);
  const [message, setMessage] = useState("");

  const fetchRegistrations = async () => {
    const data = await getMyRegistrationsRequest();
    setRegistrations(data);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que querés eliminar esta inscripción?")) return;
    const res = await deleteRegistrationRequest(id);

    setMessage(res.message);
    setTimeout(() => {
      setMessage("");
    }, 3000);

    fetchRegistrations(); //actualiza lista
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("club");
    //setToken(null); // No es necesario actualizar el estado del token porque el ProtectedRoute se basa en el localStorage
    navigate("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await createRegistrationRequest({
      category_id: categoryId,
    });

    if (res.message) {
      setMessage(res.message);
      return;
    }

    setMessage("Inscripción exitosa");
    setTimeout(() => {
      setMessage("");
    }, 3000);

    fetchRegistrations();
    setCategoryId("");
  };

  useEffect(() => {
    const fetchClubs = async () => {
      const data = await getClubsRequest();
      console.log("clubs:", data);
      setClubs(data);
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Bienvenido {club?.name} ⚽</h1>

        <button
          onClick={handleLogout}
          className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>

        <h2 className="text-xl font-semibold mb-3">Clubes registrados:</h2>

        <ul>
          {clubs.map((c) => (
            <li key={c.id} className="border p-3 mb-2 rounded-lg bg-gray-50">
              <strong>{c.name}</strong> - {c.email}
            </li>
          ))}
        </ul>
      </div>
      <form
        onSubmit={handleRegister}
        className="mt-6 flex flex-col items-center justify-center"
      >
        <h3 className="font-semibold mb-2">Inscribirse a categoría</h3>
        <div>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="border p-2 mr-2 rounded"
          >
            <option value="">Seleccionar categoría</option>

            {categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.id}
                disabled={registeredIds.includes(cat.id)}
              >
                {cat.year}{" "}
                {registeredIds.includes(cat.id) ? "(Ya inscripto)" : ""}
              </option>
            ))}
          </select>

          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Inscribirme
          </button>
        </div>
        {message && (
          <p className="mt-4 w-50 text-center text-blue-600 font-semibold border-2">
            {message}
          </p>
        )}
      </form>
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Mis inscripciones</h3>

        {registrations.length === 0 ? (
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
