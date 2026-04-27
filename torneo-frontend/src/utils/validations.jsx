export const validateLogin = ({ email, password }) => {
  if (!email || !password) {
    return "Todos los campos son obligatorios";
  }

  if (!email.includes("@")) {
    return "Email inválido";
  }

  if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres";
  }

  return null;
};

export const validateRegister = ({
  name,
  email,
  password,
  coordinator_name,
}) => {
  if (!name || !email || !password || !coordinator_name) {
    return "Todos los campos son obligatorios";
  }

  if (name.length < 6) {
    return "El nombre del club es muy corto";
  }

  if (!email.includes("@")) {
    return "Email inválido";
  }

  if (password.length < 6) {
    return "La contraseña debe tener mínimo 6 caracteres";
  }

  if (coordinator_name.length < 6) {
    return "Nombre de coordinador inválido";
  }

  return null;
};
