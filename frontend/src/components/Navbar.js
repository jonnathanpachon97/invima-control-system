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
    px-4
    py-4
    shadow-md
  ">

    <div className="
      max-w-6xl
      mx-auto
      flex
      flex-col
      md:flex-row
      md:justify-between
      md:items-center
      gap-4
    ">

      <h1 className="
        text-2xl
        font-bold
        text-center
        md:text-left
      ">
        INVIMA Control
      </h1>

      <div className="
        flex
        flex-wrap
        justify-center
        md:justify-end
        items-center
        gap-3
        text-sm
        md:text-base
      ">

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

        <Link
          to="/templates"
          className="
            hover:text-blue-400
            transition
          "
        >
          Formatos
        </Link>

        <button
          onClick={logout}
          className="
            bg-red-600
            hover:bg-red-700
            px-3
            py-2
            rounded-lg
            transition
            text-sm
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