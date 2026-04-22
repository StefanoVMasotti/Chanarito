const API_URL = "https://chanarito.onrender.com/api";

export const createRegistrationRequest = async (data) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/registrations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const getMyRegistrationsRequest = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("https://chanarito.onrender.com/api/registrations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const deleteRegistrationRequest = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `https://chanarito.onrender.com/api/registrations/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.json();
};

export const getAllRegistrationsRequest = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    "https://chanarito.onrender.com/api/registrations/all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.json();
};

export const deleteRegistrationAdminRequest = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`https://chanarito.onrender.com/api/admin/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
