import { useEffect, useState } from "react";

interface NewMarcaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (marcaData: { id?: number; nombre: string }) => void;
  initialData?: { id?: number; nombre: string };
}

function NewMarcaModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = { nombre: "" },
}: NewMarcaModalProps) {
  const [marcaData, setMarcaData] = useState(initialData);

  useEffect(() => {
    setMarcaData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMarcaData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(marcaData);
    setMarcaData({ nombre: "" }); // Resetea el formulario
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium">
              Nombre de la Marca
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={marcaData.nombre}
              onChange={handleChange}
              className="border border-gray-400 rounded w-full p-2 mt-3"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewMarcaModal;
