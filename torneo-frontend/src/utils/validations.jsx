export const validateLogin = ({ email, password }) => {
  if (!email || !password) {
    return "Todos los campos son obligatorios";
  }

  if (!email.includes("@")) {
    return "Email invalido";
  }

  if (password.length < 6) {
    return "La contrasena debe tener al menos 6 caracteres";
  }

  return null;
};

export const validateRegister = ({
  name,
  email,
  password,
  confirmPassword,
  phone,
  coordinator_name,
}) => {
  if (!name || !email || !password || !confirmPassword || !phone || !coordinator_name) {
    return "Todos los campos son obligatorios";
  }

  if (name.length < 6) {
    return "El nombre del club es muy corto";
  }

  if (!email.includes("@")) {
    return "Email invalido";
  }

  if (password.length < 6) {
    return "La contrasena debe tener minimo 6 caracteres";
  }

  if (password !== confirmPassword) {
    return "Las contrasenas no coinciden";
  }

  if (phone.length < 8) {
    return "Telefono invalido";
  }

  if (coordinator_name.length < 6) {
    return "Nombre de coordinador invalido";
  }

  return null;
};
