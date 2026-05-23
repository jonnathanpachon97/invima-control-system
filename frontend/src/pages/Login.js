import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "token/",
        {
          username,
          password
        }
      );

      localStorage.setItem(
        "access",
        response.data.access
      );

      localStorage.setItem(
        "refresh",
        response.data.refresh
      );

      navigate("/dashboard");

    } catch (error) {

      console.error(error);
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          INVIMA Control
        </h1>

        <form onSubmit={handleLogin}>

          <div className="mb-5">

            <label className="block mb-2 text-gray-700">
              Usuario
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

          <div className="mb-6">

            <label className="block mb-2 text-gray-700">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
              font-medium
              transition
            "
          >
            Ingresar
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;