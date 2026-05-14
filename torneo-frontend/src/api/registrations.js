const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const createRegistrationRequest = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/registrations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    },
  );

  return response.json();
};

export const getMyRegistrationsRequest = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/registrations`, {
    headers: getAuthHeaders(),
  });

  return res.json();
};

export const deleteRegistrationRequest = async (id) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/registrations/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    },
  );

  return res.json();
};

export const getAllRegistrationsRequest = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/registrations/all`,
    {
      headers: getAuthHeaders(),
    },
  );

  return res.json();
};

export const deleteRegistrationAdminRequest = async (id) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/registrations/admin/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    },
  );

  return res.json();
};
