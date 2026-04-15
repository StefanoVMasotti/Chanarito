const API_URL = "http://localhost:3000/api";

export const getClubsRequest = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/clubs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Bearer token para mayor seguridad
    },
  });

  return response.json();
};
