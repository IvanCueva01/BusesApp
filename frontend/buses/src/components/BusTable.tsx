import { useEffect, useState } from "react";
import {
  FaPenToSquare,
  FaRegTrashCan,
  FaPlus,
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa6";
import { useBus } from "../hooks/useBus";
import NewBusModal from "./NewBusModal";

interface BusData {
  id?: number;
  numeroBus: string;
  placa: string;
  fechaCreacion: Date;
  marca: { id?: number; nombre: string };
  caracteristicas: string;
  estado: boolean;
}
function Tabla() {
  const {
    buses,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    getBuses,
    getBusById,
    createBus,
    updateBus,
    deleteBus,
  } = useBus();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState<BusData | null>(null);

  useEffect(() => {
    getBuses(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getBuses(page);
  };
  const openModal = (busData?: BusData) => {
    setSelectedBus(busData || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBus(null);
  };

  const handleSubmit = (busData: BusData) => {
    if (busData.id) {
      updateBus(busData); // Llamar a la función de edición
    } else {
      createBus(busData); // Llamar a la función de creación
    }
    closeModal();
  };

  if (loading) return <div>Loading...</div>; //skeletons
  if (error) return <div>{error}</div>; //page 404

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex w-[90%] justify-between">
        <h1 className="text-3xl text-center my-4">Tabla de Buses</h1>
        <button
          className="flex items-center bg-green-600 hover:bg-green-400 text-white py-2 px-4 rounded my-4"
          onClick={() => openModal()}
        >
          <FaPlus className="mr-2" /> Nuevo Bus
        </button>
      </div>
      <table className="w-[90%] border border-slate-500 border-2 border-collapse my-6 mx-6">
        <thead className="bg-slate-400">
          <tr className="text-center text-sm">
            <th>ID</th>
            <th>#Bus</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Estado</th>
            <th>Fecha_Creacion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {buses.map((bus) => (
            <tr className="hover:bg-green-200" key={bus.id}>
              <td>{bus.id}</td>
              <td>{bus.numeroBus}</td>
              <td>{bus.placa}</td>
              <td>{bus.marca.nombre}</td>
              <td>{bus.estado ? "Activo" : "Inactivo"}</td>
              <td>{bus.fechaCreacion.toString().split("T")[0]}</td>
              <td className="flex justify-center">
                <button
                  className="flex items-center mr-5"
                  onClick={() => openModal(bus)}
                >
                  <FaPenToSquare className="text-blue-600" />
                  Editar
                </button>
                <button
                  className="flex items-center"
                  onClick={() => deleteBus(bus.id)}
                >
                  <FaRegTrashCan className="text-red-600" />
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => getBuses(currentPage - 1)}
          className={`px-4 py-2 ${currentPage === 1 ? "hidden" : ""}`}
        >
          <FaAngleLeft />
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => getBuses(currentPage + 1)}
          className={`px-4 py-2 ${currentPage === totalPages ? "hidden" : ""}`}
        >
          <FaAngleRight />
        </button>
      </div>
      {/* Modal */}
      <NewBusModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={
          selectedBus || {
            id: 0,
            numeroBus: "",
            placa: "",
            fechaCreacion: new Date(),
            marca: { id: 0, nombre: "" },
            caracteristicas: "",
            estado: true,
          }
        }
      />
    </div>
  );
}

export default Tabla;
