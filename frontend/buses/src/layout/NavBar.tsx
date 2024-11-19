import { Link } from "react-router-dom";
type Props = {};

function NavBar({}: Props) {
  return (
    <nav className="flex bg-gray-400 p-2">
      <div className="flex gap-2 w-1/4">
        <Link to="/" className="flex items-center">
          <img src="/img/logo.svg" width={50} height={50} alt="logo" />
          <p className="text-3xl font-bold">BusApp</p>
        </Link>
      </div>
      <div className="w-2/3 flex justify-center items-center">
        <ul className="flex gap-6 text-lg">
          <li className="hover:text-cyan-600">
            <Link to="/buses">Buses</Link>
          </li>
          <li className="hover:text-cyan-600">
            <Link to="/marcas">Marcas</Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-end gap-2 w-1/4">
        <a href="#" className="flex gap-2 items-center">
          <p className="text-xl font-semibold">Username</p>
          <img src="/img/user.svg" width={50} height={50} alt="logo" />
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
