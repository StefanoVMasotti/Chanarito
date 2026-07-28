import { useEffect, useState } from "react";
import {
  getAllRegistrationsRequest,
  deleteRegistrationAdminRequest,
} from "../api/registrations";
import { getClubsRequest, deleteClubRequest } from "../api/clubs";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import confirmDelete from "../utils/confirm.jsx";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Footer from "../components/Footer.jsx";

const dateFormatter = new Intl.DateTimeFormat("es-AR");

function Admin() {
  const [registrations, setRegistrations] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [registrationsData, clubsData] = await Promise.all([
        getAllRegistrationsRequest(),
        getClubsRequest(),
      ]);

      const formattedData = registrationsData.map((r) => ({
        ...r,
        formattedDate: dateFormatter.format(new Date(r.created_at)),
      }));

      setRegistrations(formattedData);
      setClubs(clubsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = registrations.filter((r) => {
    const matchesSearch = r.club.toLowerCase().includes(search.toLowerCase());
    const matchesYear = filterYear ? r.year.toString() === filterYear : true;
    return matchesSearch && matchesYear;
  });

  const sortedRegistrations = filteredRegistrations.toSorted((a, b) => {
    if (sortOrder === "asc") return Number(a.year) - Number(b.year);
    return Number(b.year) - Number(a.year);
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Torneo Chanarito", 105, 18, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Generado: ${new Date().toLocaleDateString()}`, 14, 28);

    const tableData = sortedRegistrations.map((r) => [
      r.club,
      r.year,
      r.formattedDate,
    ]);

    autoTable(doc, {
      startY: 35,
      head: [["Club", "Categoria", "Fecha"]],
      body: tableData,
      styles: { cellPadding: 3 },
      headStyles: { fillColor: [37, 99, 235] },
    });

    doc.save("inscripcionesChanarito.pdf");
  };

  const handleDelete = async (id) => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;

    await deleteRegistrationAdminRequest(id);
    setLoading(true);
    await Swal.fire({
      title: "Eliminado",
      text: "La inscripcion fue eliminada",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
    fetchData();
  };

  const handleDeleteClub = async () => {
    if (!selectedClub) return;

    const confirmed = await confirmDelete();
    if (!confirmed) return;

    const res = await deleteClubRequest(selectedClub.id);

    if (res?.message?.toLowerCase().includes("eliminado")) {
      toast.success("Club eliminado correctamente");
      setSelectedClub(null);
      setLoading(true);
      fetchData();
    } else {
      toast.error(res?.message || "No se pudo eliminar el club");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app-bg p-4 md:p-6">
      <div className="glass-panel max-w-6xl mx-auto p-6 md:p-8 rounded-3xl text-white">
        <h1 className="text-3xl font-extrabold mb-5">Panel Administrador</h1>

        <div className="max-w-5xl mx-auto my-4 flex flex-wrap gap-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="secondary-btn px-4 py-2 rounded-xl"
          >
            Panel Principal
          </button>
          <button
            onClick={handleDownloadPDF}
            className="primary-btn px-4 py-2 rounded-xl font-semibold"
          >
            Descargar PDF
          </button>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Clubes registrados</h2>
          {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {clubs.map((club) => (
                <button
                  key={club.id}
                  onClick={() => setSelectedClub(club)}
                  className="glass-panel text-left rounded-2xl p-4 hover:bg-white/20 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-base">{club.name}</p>
                    </div>
                    <span
                      className="secondary-btn px-2 py-1 rounded-lg"
                      title="Ver detalle"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-4 h-4"
                      >
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Inscripciones</h2>
          <div className="grid md:grid-cols-3 gap-3 mb-4">
            <input
              type="text"
              placeholder="Buscar club..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="field md:col-span-2"
            />

            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="field"
            >
              <option value="">Todas las categorias</option>
              {[...new Set(registrations.map((r) => r.year))].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="secondary-btn px-3 py-2 rounded-xl"
            >
              Orden: {sortOrder === "asc" ? "Ascendente" : "Descendente"}
            </button>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/20">
              <table className="w-full">
                <thead className="bg-white/10">
                  <tr>
                    <th className="p-3 text-left">Club</th>
                    <th className="p-3 text-left">Categoria</th>
                    <th className="p-3 text-left">Fecha</th>
                    <th className="p-3 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRegistrations.map((r) => (
                    <tr
                      key={r.id}
                      className="border-t border-white/10 hover:bg-white/8"
                    >
                      <td className="p-3">{r.club}</td>
                      <td className="p-3">{r.year}</td>
                      <td className="p-3">{r.formattedDate}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="secondary-btn px-3 py-2 rounded-lg"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {selectedClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">Detalle del club</h3>
              <button
                onClick={() => setSelectedClub(null)}
                className="secondary-btn px-3 py-1 rounded-lg"
              >
                Cerrar
              </button>
            </div>

            <div className="space-y-3 text-[15px] mb-5">
              <p>
                <span className="font-semibold">Nombre club:</span>{" "}
                {selectedClub.name}
              </p>
              <p>
                <span className="font-semibold">Coordinador:</span>{" "}
                {selectedClub.coordinator_name}
              </p>
              <p>
                <span className="font-semibold">Mail:</span>{" "}
                {selectedClub.email}
              </p>
              <p>
                <span className="font-semibold">Telefono:</span>{" "}
                {selectedClub.phone || "Sin telefono"}
              </p>
            </div>

            <button
              onClick={handleDeleteClub}
              className="w-full secondary-btn px-4 py-3 rounded-xl"
            >
              Eliminar club
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Admin;


