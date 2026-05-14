import { useEffect, useState } from "react";
import {
  getAllRegistrationsRequest,
  deleteRegistrationAdminRequest,
} from "../api/registrations";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import confirmDelete from "../utils/confirm.jsx";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner";

const dateFormatter = new Intl.DateTimeFormat("es-AR");

function Admin() {
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await getAllRegistrationsRequest();
      const formattedData = data.map((r) => ({
        ...r,
        formattedDate: dateFormatter.format(new Date(r.created_at)),
      }));
      setRegistrations(formattedData);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app-bg p-4 md:p-6">
      <div className="glass-panel max-w-5xl mx-auto p-6 md:p-8 rounded-3xl text-white">
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
      </div>
    </div>
  );
}

export default Admin;
