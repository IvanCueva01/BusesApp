import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="w-full flex bg-gray-400 p-2 md:flex-row">
      <div className="flex justify-between w-full md:w-1/4 items-center">
        <Link to="/" className="flex items-center">
          <img src="/img/logo.svg" width={40} height={40} alt="logo" />
          <p className="md:text-3xl font-bold">BusApp</p>
        </Link>
      </div>
      <div className="w-full md:w-2/3 flex justify-center items-center mt-2 md:mt-0">
        <ul className="flex gap-4 text-lg flex-col md:flex-row items-center">
          <li className="hover:text-cyan-600">
            <Link to="/buses">Buses</Link>
          </li>
          <li className="hover:text-cyan-600">
            <Link to="/marcas">Marcas</Link>
          </li>
        </ul>
      </div>
      <div className="w-full md:w-1/4 flex justify-end gap-2 mt-2 md:mt-0">
        <a href="#" className="flex gap-2 items-center justify-center">
          <p className="text-xl font-semibold">Username</p>
          <img src="/img/user.svg" width={40} height={40} alt="logo" />
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
