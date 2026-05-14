import Swal from "sweetalert2";

const logout = async () => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Deseas cerrar sesión, Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Sí, cerrar sesión",
    cancelButtonText: "Cancelar",
  });

  return result.isConfirmed;
};

export default logout;
