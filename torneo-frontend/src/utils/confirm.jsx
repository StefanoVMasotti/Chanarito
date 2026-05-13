import Swal from "sweetalert2";

const confirmDelete = async () => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Deseas eliminar esta inscripción, Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  return result.isConfirmed;
};

export default confirmDelete;
