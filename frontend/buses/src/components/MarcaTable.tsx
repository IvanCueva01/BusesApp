import { useEffect, useState } from "react";
import { useMarca } from "../hooks/useMarca";
import { FaPenToSquare, FaPlus, FaRegTrashCan } from "react-icons/fa6";
import NewMarcaModal from "./NewMarcaModal";

interface MarcaData {
  id?: number;
  nombre: string;
}
function MarcaTable() {
  const {
    marca,
    loading,
    error,
    getMarca,
    createMarca,
    updateMarca,
    deleteMarca,
  } = useMarca();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarca, setSelectedMarca] = useState<MarcaData | null>(null);

  useEffect(() => {
    getMarca();
  }, []);

  const openModal = (marcaData?: MarcaData) => {
    setSelectedMarca(marcaData || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMarca(null);
  };

  const handleSubmit = (marcaData: MarcaData) => {
    if (marcaData.id) {
      updateMarca(marcaData); // Llamar a la función de edición
    } else {
      createMarca(marcaData); // Llamar a la función de creación
    }
    closeModal();
  };

  if (loading) return <div>Loading...</div>; //skeletons
  if (error) return <div>{error}</div>; //page 404

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex w-[90%] justify-between ">
        <h1 className="text-2xl md:text-3xl text-center my-4">
          Tabla de Marcas de Buses
        </h1>
        <button
          className="flex items-center bg-green-600 hover:bg-green-400 text-white py-2 px-4 rounded my-4"
          onClick={() => openModal()}
        >
          <FaPlus className="mr-2" /> Nueva Marca
        </button>
      </div>
      <table className="w-[90%] border border-slate-500 border-2 border-collapse my-6 mx-6">
        <thead className="bg-slate-400">
          <tr className="text-center text-sm">
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {marca.map((marca) => (
            <tr className="hover:bg-green-200" key={marca.id}>
              <td>{marca.id}</td>
              <td>{marca.nombre}</td>
              <td className="flex justify-center">
                <button
                  className="flex items-center mr-5"
                  onClick={() => openModal(marca)}
                >
                  <FaPenToSquare className="text-blue-600" />
                  Editar
                </button>
                <button
                  className="flex items-center"
                  onClick={() => deleteMarca(marca.id)}
                >
                  <FaRegTrashCan className="text-red-600" />
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <NewMarcaModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={selectedMarca || { nombre: "" }}
      />
    </div>
  );
}

export default MarcaTable;
