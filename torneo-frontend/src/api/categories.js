export const getCategoriesRequest = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
  return res.json();
};
