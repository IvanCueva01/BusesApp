import React, { useEffect, useState } from "react";
import { useMarca } from "../hooks/useMarca";

interface NewBusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (busData: {
    id?: number;
    numeroBus: string;
    placa: string;
    fechaCreacion: Date;
    marca: { id: number; nombre: string };
    caracteristicas: string;
    estado: boolean;
  }) => void;
  initialData?: {
    id?: number;
    numeroBus: string;
    placa: string;
    fechaCreacion: Date;
    marca: { id: number; nombre: string };
    caracteristicas: string;
    estado: boolean;
  };
}

function NewBusModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = {
    numeroBus: "",
    placa: "",
    fechaCreacion: new Date(),
    marca: { id: 0, nombre: "" },
    caracteristicas: "",
    estado: true,
  },
}: NewBusModalProps) {
  const [busData, setBusData] = useState(initialData);
  const [marcas, setMarcas] = useState<{ id: number; nombre: string }[]>([]);
  const { getMarca } = useMarca();

  useEffect(() => {
    if (isOpen) {
      getMarca().then((data) => {
        setMarcas(data); // Suponiendo que getMarca retorna un arreglo de marcas
      });
    }
  }, [isOpen, getMarca]);

  useEffect(() => {
    setBusData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setBusData((prev) => ({
      ...prev,
      [name]: name === "marca" ? { ...prev.marca, id: parseInt(value) } : value,
      estado: name === "estado" ? value === "true" : prev.estado,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(busData);
    setBusData({
      numeroBus: "",
      placa: "",
      fechaCreacion: new Date(),
      marca: { id: 0, nombre: "" },
      caracteristicas: "",
      estado: true,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Nuevo Bus</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="numeroBus" className="block text-sm font-medium">
              Número del Bus
            </label>
            <input
              type="text"
              id="numeroBus"
              name="numeroBus"
              value={busData.numeroBus}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="placa" className="block text-sm font-medium">
              Placa
            </label>
            <input
              type="text"
              id="placa"
              name="placa"
              value={busData.placa}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="marca" className="block text-sm font-medium">
              Marca
            </label>
            <select
              id="marca"
              name="marca"
              value={busData.marca.id || ""}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            >
              <option value="">Selecciona una marca</option>
              {marcas.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="caracteristicas"
              className="block text-sm font-medium"
            >
              Características
            </label>
            <textarea
              id="caracteristicas"
              name="caracteristicas"
              value={busData.caracteristicas}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
          {/* Campo Estado */}
          <div className="mb-4">
            <label htmlFor="estado" className="block text-sm font-medium">
              Estado
            </label>
            <select
              id="estado"
              name="estado"
              value={busData.estado.toString()}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
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
              onClick={handleSubmit}
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

export default NewBusModal;
