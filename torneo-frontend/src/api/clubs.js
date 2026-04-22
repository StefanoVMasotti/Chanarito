export const getClubsRequest = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${VITE_API_URL}/api/clubs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};
