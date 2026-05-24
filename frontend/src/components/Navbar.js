import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/");
  };

  return (

    <nav className="
      bg-gray-900
      text-white
      px-6
      py-4
      shadow-md
    ">

      <div className="
        max-w-6xl
        mx-auto
        flex
        justify-between
        items-center
      ">

        <h1 className="text-2xl font-bold">
          INVIMA Control
        </h1>

        <div className="flex gap-4">

          <Link
            to="/dashboard"
            className="
              hover:text-blue-400
              transition
            "
          >
            Dashboard
          </Link>

          <Link
            to="/create-template"
            className="
              hover:text-blue-400
              transition
            "
          >
            Crear Formato
          </Link>

          <button
            onClick={logout}
            className="
              bg-red-600
              hover:bg-red-700
              px-4
              py-2
              rounded-lg
              transition
            "
          >
            Cerrar sesión
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;