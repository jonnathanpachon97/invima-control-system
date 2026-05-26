import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import api from "../services/api";
import DynamicForm from "../components/DynamicForm";
import RecordsTable from "../components/RecordsTable";
import Navbar from "../components/Navbar";

function Dashboard() {

  const [templates, setTemplates] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadTemplates();
    loadRecords();
  }, []);

  const loadTemplates = async () => {

    try {

      const response = await api.get("form-templates/");
      setTemplates(response.data);

    } catch (error) {
      console.error(error);
    }
  };

    const loadRecords = async () => {

    try {

      const response = await api.get("records/");
      setRecords(response.data);

    } catch (error) {
      console.error(error);
    }
  };

    const deleteTemplate = async (id) => {

    const confirmDelete = window.confirm(
      "¿Eliminar este formato?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await api.delete(
        `form-templates/${id}/`
      );

      alert("Formato eliminado");

      loadTemplates();

    } catch (error) {

      console.error(error);

      alert("Error eliminando formato");
    }
  };

return (

  <>

    <Navbar />

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Dashboard INVIMA
        </h1>

        <div className="grid gap-6">

          {
            templates.map((template) => (

                  <div
                    key={template.id}
                    className="bg-white rounded-2xl shadow-md p-6"
                  >

                  <div className="flex justify-end gap-3 mb-4">

                    <Link
                      to={`/templates/${template.id}/edit`}
                      className="
                        bg-yellow-500
                        hover:bg-yellow-600
                        text-white
                        px-4
                        py-2
                        rounded-xl
                        transition
                      "
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() => deleteTemplate(template.id)}
                      className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-4
                        py-2
                        rounded-xl
                        transition
                      "
                    >
                      Desactivar
                    </button>

                  </div>

                <DynamicForm
                  template={template}
                  onRecordCreated={loadRecords}
                />

              </div>
            ))
          }

        </div>

        <RecordsTable records={records} />

      </div>

    </div>

  </>
);
}

export default Dashboard;