import { useState } from "react";
interface Marca {
  id?: number;
  nombre: string;
}

export function useMarca() {
  const [marca, setMarca] = useState<Marca[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  // Obtener todos las marcas
  const getMarca = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/marca");
      if (!response.ok) {
        throw new Error("Error al obtener los datos de las marcas de buses");
      }
      const data = await response.json();
      setMarca(data);
    } catch (err) {
      setError("Error al obtener los datos");
    } finally {
      setLoading(false);
    }
    return marca;
  };

  // Obtener una marca por ID
  const getMarcaById = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/marca/${id}`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos de la marca");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError("Error al obtener los datos");
    } finally {
      setLoading(false);
    }
  };
  // Crear una nueva marca
  const createMarca = async (newMarca: Omit<Marca, "id">) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/marca", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMarca),
      });
      if (!response.ok) {
        throw new Error("Error al crear la marca");
      }
      await getMarca(); // Actualizar la lista de marcas después de crear
    } catch (err) {
      setError("Error al crear la marca");
    } finally {
      setLoading(false);
    }
  };
  // Actualizar una marca
  const updateMarca = async (marca: Marca) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/marca/${marca.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(marca),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar la marca");
      }
      await getMarca(); // Actualizar la lista de marcas
    } catch (err) {
      setError("Error al actualizar la marca");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un bus
  const deleteMarca = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/marca/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar la marca");
      }
      await getMarca(); // Actualizar la lista de marcas
    } catch (err) {
      setError("Error al eliminar la marca");
    } finally {
      setLoading(false);
    }
  };

  return {
    marca,
    loading,
    error,
    getMarca,
    getMarcaById,
    createMarca,
    updateMarca,
    deleteMarca,
  };
}
