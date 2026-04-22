const API_URL = "https://chanarito.onrender.com/api";

export const getCategoriesRequest = async () => {
  const res = await fetch(`${API_URL}/categories`);
  return res.json();
};
