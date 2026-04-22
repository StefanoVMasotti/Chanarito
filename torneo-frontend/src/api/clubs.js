const API_URL = "https://chanarito.onrender.com/api";

export const getClubsRequest = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/clubs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};
