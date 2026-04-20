import { useEffect, useState } from "react";
import {
  getAllRegistrationsRequest,
  deleteRegistrationAdminRequest,
} from "../api/registrations";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Admin() {
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const navigate = useNavigate();
  const logo =
    "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";

  const fetchData = async () => {
    const data = await getAllRegistrationsRequest();
    setRegistrations(data);
  };

  const filteredRegistrations = registrations.filter((r) => {
    const matchesSearch = r.club.toLowerCase().includes(search.toLowerCase());

    const matchesYear = filterYear ? r.year.toString() === filterYear : true;

    return matchesSearch && matchesYear;
  });

  const sortedRegistrations = [...filteredRegistrations].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.year) - new Date(b.year);
    } else {
      return new Date(b.year) - new Date(a.year);
    }
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    //Logo
    doc.addImage(logo, "PNG", 14, 10, 30, 30);

    //Título centrado
    doc.setFontSize(18);
    doc.text("Torneo Chañarito", 105, 25, { align: "center" });

    //Fecha
    doc.setFontSize(10);
    doc.text(`Generado: ${new Date().toLocaleDateString()}`, 14, 45);

    //Datos
    const tableData = sortedRegistrations.map((r) => [
      r.club,
      r.year,
      new Date(r.created_at).toLocaleDateString(),
    ]);

    //Tabla
    autoTable(doc, {
      startY: 50,
      head: [["Club", "Categoría", "Fecha"]],
      body: tableData,

      styles: {
        cellPadding: 3,
      },

      headStyles: {
        fillColor: [22, 160, 133],
      },
    });

    doc.save("inscripcionesChañarito.pdf");
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar esta inscripción?")) return;

    const res = await deleteRegistrationAdminRequest(id);

    alert(res.message);

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-blue-950 p-6">
      <div className="max-w-4xl mx-auto bg-white/20 text-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Panel Admin ⚽</h1>

        <input
          type="text"
          placeholder="Buscar club..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        <div className="flex flex-row justify-around">
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="border p-2 rounded mb-4"
          >
            <option value="">Todas las categorías</option>

            {[...new Set(registrations.map((r) => r.year))].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <span>
            {" "}
            Orden:
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="mb-4 bg-gray-500 hover:bg-gray-800 text-white px-3 py-1 rounded"
            >
              {sortOrder === "asc" ? "Ascendente" : "Descendente"}
            </button>
          </span>
        </div>

        <table className="w-full border">
          <thead>
            <tr>
              <th className="p-2 border">Club</th>
              <th className="p-2 border">Categoría</th>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {sortedRegistrations.map((r) => (
              <tr key={r.id}>
                <td className="p-2 border">{r.club}</td>
                <td className="p-2 border">{r.year}</td>
                <td className="p-2 border">
                  {new Date(r.created_at).toLocaleDateString()}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="max-w-4xl mx-auto mt-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ir a Dashboard
        </button>
        <button
          onClick={handleDownloadPDF}
          className="mb-4 bg-green-400 text-white px-4 py-2 rounded"
        >
          Descargar PDF
        </button>
      </div>
    </div>
  );
}

export default Admin;
