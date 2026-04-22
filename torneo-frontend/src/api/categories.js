export const getCategoriesRequest = async () => {
  const res = await fetch(`${VITE_API_URL}/api/categories`);
  return res.json();
};
