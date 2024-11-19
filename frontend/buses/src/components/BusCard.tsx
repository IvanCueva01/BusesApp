import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBus } from "../hooks/useBus";

interface Bus {
  id?: number;
  numeroBus: string;
  placa: string;
  fechaCreacion: string;
  marca: { id?: number; nombre: string };
  caracteristicas: string;
  estado: boolean;
}
function BusCard() {
  const { id } = useParams<{ id: string }>(); // Capturar el ID de la URL
  const { getBusById } = useBus();
  const [bus, setBus] = useState<Bus>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBus = async () => {
      if (id) {
        try {
          const data = await getBusById(Number(id)); // Asegúrate de que el ID es numérico
          setBus(data);
        } catch (error) {
          console.error("Error al obtener los detalles del bus:", error);
        }
      }
    };

    fetchBus();
  }, [id, getBusById]);

  if (!bus) return <div>Cargando detalles del bus...</div>;

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl mb-4">Detalles del Bus</h1>
      <div className="w-[80%] p-4 border border-gray-300 rounded-md shadow-lg">
        <p>
          <strong>ID:</strong> {bus.id}
        </p>
        <p>
          <strong>Número de Bus:</strong> {bus.numeroBus}
        </p>
        <p>
          <strong>Placa:</strong> {bus.placa}
        </p>
        <p>
          <strong>Marca:</strong> {bus.marca?.nombre}
        </p>
        <p>
          <strong>Características:</strong> {bus.caracteristicas}
        </p>
        <p>
          <strong>Estado:</strong> {bus.estado ? "Activo" : "Inactivo"}
        </p>
        <p>
          <strong>Fecha de Creación:</strong> {bus.fechaCreacion.split("T")[0]}
        </p>
        <p>
          <strong>Hora de Creación:</strong> {bus.fechaCreacion.split("T")[1]}
        </p>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
    </div>
  );
}

export default BusCard;
