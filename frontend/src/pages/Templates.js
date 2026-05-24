import { useEffect, useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";

function Templates() {

  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {

    try {

      const response = await api.get(
        "form-templates/"
      );

      setTemplates(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const deleteTemplate = async (id) => {

    const confirmDelete = window.confirm(
      "¿Eliminar formato?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `form-templates/${id}/`
      );

      loadTemplates();

    } catch (error) {

      console.error(error);

      alert(
        "Error eliminando formato"
      );
    }
  };

  return (

    <>

      <Navbar />

      <div className="
        min-h-screen
        bg-gray-100
        p-6
      ">

        <div className="
          max-w-5xl
          mx-auto
        ">

          <h1 className="
            text-4xl
            font-bold
            mb-8
          ">
            Administrar Formatos
          </h1>

          <div className="
            bg-white
            rounded-2xl
            shadow-md
            overflow-hidden
          ">

            <table className="w-full">

              <thead className="bg-gray-200">

                <tr>

                  <th className="text-left p-4">
                    Nombre
                  </th>

                  <th className="text-left p-4">
                    Descripción
                  </th>

                  <th className="text-left p-4">
                    Acciones
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  templates.map((template) => (

                    <tr
                      key={template.id}
                      className="border-t"
                    >

                      <td className="p-4">
                        {template.name}
                      </td>

                      <td className="p-4">
                        {template.description}
                      </td>

                      <td className="p-4">

                        <button
                          onClick={() =>
                            deleteTemplate(
                              template.id
                            )
                          }
                          className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            transition
                          "
                        >
                          Eliminar
                        </button>

                      </td>

                    </tr>
                  ))
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </>
  );
}

export default Templates;