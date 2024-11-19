import { Routes, Route } from "react-router-dom";
import BusTable from "../components/BusTable";
import MarcaTable from "../components/MarcaTable";

type Props = {};

function MainContent({}: Props) {
  return (
    <Routes>
      <Route path="/buses" element={<BusTable />} />
      <Route path="/marcas" element={<MarcaTable />} />
      {/* Ruta por defecto */}
      <Route
        path="*"
        element={
          <div className="text-2xl text-center my-4">
            Selecciona una opción del menú
          </div>
        }
      />
    </Routes>
  );
}

export default MainContent;
