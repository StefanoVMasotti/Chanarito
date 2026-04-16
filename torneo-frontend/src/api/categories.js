const API_URL = "http://localhost:3000/api";

export const getCategoriesRequest = async () => {
  const res = await fetch(`${API_URL}/categories`);
  return res.json();
};
