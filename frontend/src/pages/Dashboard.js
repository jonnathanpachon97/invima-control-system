import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import api from "../services/api";
import DynamicForm from "../components/DynamicForm";
import RecordsTable from "../components/RecordsTable";
import Navbar from "../components/Navbar";
import DashboardCharts from "../components/DashboardCharts";

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

  const statusData = [

  {
    name: "Aprobados",
    value: records.filter(
      (r) => r.status === "aprobado"
    ).length
  },

  {
    name: "Rechazados",
    value: records.filter(
      (r) => r.status === "rechazado"
    ).length
  },

  {
    name: "Pendientes",
    value: records.filter(
      (r) => r.status === "pendiente"
    ).length
  }

];

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#eab308"
];

return (

  <>

    <Navbar />

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Dashboard INVIMA
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            p-6
          "
        >

          <h2 className="text-gray-500 text-lg">
            Formatos Activos
          </h2>

          <p className="text-4xl font-bold mt-2 text-blue-600">
            {templates.length}
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            p-6
          "
        >

          <h2 className="text-gray-500 text-lg">
            Registros Totales
          </h2>

          <p className="text-4xl font-bold mt-2 text-green-600">
            {records.length}
          </p>

        </div>

      </div>

        <DashboardCharts records={records} />

        <div className="
          bg-white
          p-6
          rounded-2xl
          shadow-md
          mt-6
          mb-8
        ">

          <h2 className="
            text-2xl
            font-bold
            mb-6
          ">
            Estados de Registros
          </h2>

          <div className="w-full h-80">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >

                  {
                    statusData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={COLORS[index]}
                        />

                      )
                    )
                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

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