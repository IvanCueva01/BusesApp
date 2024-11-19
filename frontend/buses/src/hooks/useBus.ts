import { useState } from "react";
interface Bus {
  id?: number;
  numeroBus: string;
  placa: string;
  fechaCreacion: Date;
  caracteristicas: string;
  marca: {
    id?: number;
    nombre: string;
  };
  estado: boolean;
}

export function useBus() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  // Obtener todos los buses
  const getBuses = async (page: number = 1, size: number = 10) => {
    setLoading(true);
    try {
      const apiPage = page - 1;
      const response = await fetch(
        `http://localhost:4000/bus?page=${apiPage}&size=${size}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos de los buses");
      }
      const data = await response.json();
      setBuses(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (err) {
      setError("Error al obtener los datos");
    } finally {
      setLoading(false);
    }
  };

  // Obtener un bus por ID
  const getBusById = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/bus/${id}`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos del bus");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError("Error al obtener los datos");
    } finally {
      setLoading(false);
    }
  };
  // Crear un nuevo bus
  const createBus = async (newBus: Omit<Bus, "id">) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/bus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBus),
      });
      if (!response.ok) {
        throw new Error("Error al crear el bus");
      }
      await getBuses(); // Actualizar la lista de buses después de crear
    } catch (err) {
      setError("Error al crear el bus");
    } finally {
      setLoading(false);
    }
  };
  // Actualizar un bus
  const updateBus = async (bus: Bus) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/bus/${bus.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bus),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar el bus");
      }
      await getBuses(); // Actualizar la lista de buses
    } catch (err) {
      setError("Error al actualizar el bus");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un bus
  const deleteBus = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/bus/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el bus");
      }
      await getBuses(); // Actualizar la lista de buses
    } catch (err) {
      setError("Error al eliminar el bus");
    } finally {
      setLoading(false);
    }
  };

  return {
    buses,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
    getBuses,
    getBusById,
    createBus,
    updateBus,
    deleteBus,
  };
}
