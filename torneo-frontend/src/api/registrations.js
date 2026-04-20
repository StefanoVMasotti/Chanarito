const API_URL = "http://localhost:3000/api";

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

  const res = await fetch("http://localhost:3000/api/registrations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const deleteRegistrationRequest = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:3000/api/registrations/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const getAllRegistrationsRequest = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3000/api/registrations/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const deleteRegistrationAdminRequest = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `http://localhost:3000/api/registrations/admin/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.json();
};
