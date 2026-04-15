import { useEffect, useState } from "react";
import { getClubsRequest } from "../api/clubs";

function Dashboard({ setToken }) {
  const club = JSON.parse(localStorage.getItem("club"));
  const [clubs, setClubs] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("club");
    setToken(null);
  };

  useEffect(() => {
    const fetchClubs = async () => {
      const data = await getClubsRequest();
      console.log("clubs:", data);
      setClubs(data);
    };

    fetchClubs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenido {club?.name} </h1>

      <button
        onClick={handleLogout}
        className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      <h2 className="text-xl font-semibold mb-2">Clubes registrados:</h2>

      <ul>
        {clubs.map((c) => (
          <li key={c.id} className="border p-2 mb-2 rounded">
            {c.name} - {c.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
