import { toast } from "react-toastify";

function confirmDelete(onConfirm) {
  toast.info(
    ({ closeToast }) => (
      <div>
        <p>¿Seguro que querés eliminar?</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={async () => {
              await onConfirm();
              closeToast();
            }}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Sí
          </button>

          <button
            onClick={closeToast}
            className="bg-gray-300 px-2 py-1 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    ),
    { autoClose: false, position: "top-center" },
  );
}

export default confirmDelete;
