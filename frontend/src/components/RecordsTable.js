import { useState } from "react";

import api from "../services/api";

function RecordsTable({ records }) {

  const [search, setSearch] = useState("");

const filteredRecords = records.filter((record) => {

  const values = `
    ${Object.values(record.data).join(" ")}
    ${new Date(record.created_at).toLocaleDateString()}
    ${record.id}
  `.toLowerCase();

  return values.includes(
    search.toLowerCase()
  );
});

  const downloadExcel = async () => {

  try {

    const response = await api.get(
      "records/export/excel/",
      {
        responseType: "blob"
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      "records.xlsx"
    );

    document.body.appendChild(link);

    link.click();

  } catch (error) {

    console.error(error);

    alert("Error descargando Excel");
  }
};

  const downloadPDF = async (id) => {

  try {

    const response = await api.get(
      `records/${id}/pdf/`,
      {
        responseType: "blob"
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      `record_${id}.pdf`
    );

    document.body.appendChild(link);

    link.click();

  } catch (error) {

    console.error(error.response);
    alert(error.response?.data?.detail || "Error descargando PDF");
  }
};

const updateStatus = async (
  id,
  status
) => {

  try {

    await api.patch(
      `records/${id}/`,
      {
        status
      }
    );

    window.location.reload();

  } catch (error) {

    console.error(error);

    alert("Error actualizando estado");
  }
};

  return (
    <div className="mt-10">

      <div className="flex justify-between items-center mb-4">

      <h2 className="text-2xl font-bold">
        Registros
      </h2>

      <button
        onClick={downloadExcel}
        className="
          bg-green-600
          hover:bg-green-700
          text-white
          px-4
          py-2
          rounded-xl
          transition
        "
      >
        Exportar Excel
      </button>

    </div>

      <div className="mb-4">

      <input
        type="text"
        placeholder="Buscar registros..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          md:w-96
          border
          border-gray-300
          rounded-xl
          px-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          bg-white
        "
      />

    </div>

      <div className="overflow-x-auto">

        <table className="w-full bg-white rounded-2xl shadow-md">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">
              Fecha
            </th>

            <th className="text-left p-4">
              ID
            </th>

            <th className="text-left p-4">
              Datos
            </th>

            <th className="text-left p-4">
              Estado
            </th>

            <th className="text-left p-4">
              Evidencia
            </th>

            <th className="text-left p-4">
              PDF
            </th>

          </tr>

        </thead>

          <tbody>

            {
              filteredRecords.map((record) => {

              console.log(record.image);

              return (

                <tr
                  key={record.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {new Date(record.created_at).toLocaleString()}
                  </td>

                  <td className="p-4">
                    {record.id}
                  </td>

                  <td className="p-4">

                    {
                      Object.entries(record.data).map(
                        ([key, value]) => (

                          <div key={key}>
                            <strong>{key}:</strong> {value}
                          </div>
                        )
                      )
                    }

                  </td>

                  <td className="p-4">

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-semibold

                        ${
                          record.status === "aprobado"
                            ? "bg-green-100 text-green-700"
                            : record.status === "rechazado"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >

                      {
                        record.status === "pendiente"
                          ? "Pendiente"
                          : record.status === "aprobado"
                          ? "Aprobado"
                          : "Rechazado"
                      }

                    </span>

                    {
                      record.status === "pendiente" && (

                      <div className="flex gap-2 mt-2 flex-wrap">

                        <button
                          onClick={() =>
                            updateStatus(record.id, "aprobado")
                          }
                          className="
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            px-2
                            py-1
                            rounded-lg
                            text-xs
                          "
                        >
                          Aprobar
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(record.id, "rechazado")
                          }
                          className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-2
                            py-1
                            rounded-lg
                            text-xs
                          "
                        >
                          Rechazar
                        </button>

                      </div>

                    )
                  }

                  </td>

                  <td className="p-4">

                    {
                      record.image ? (

                        <img
                          src={record.image}
                          alt="evidencia"
                          className="
                            w-24
                            h-24
                            object-cover
                            rounded-xl
                            border
                          "
                        />

                      ) : (

                        <span className="text-gray-400">
                          Sin imagen
                        </span>

                      )
                    }

                  </td>

                  <td className="p-4">

                    <button
                      onClick={() => downloadPDF(record.id)}
                      className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        transition
                      "
                    >
                      Descargar PDF
                    </button>

                    </td>

                </tr>
              );
            })
          }
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecordsTable;