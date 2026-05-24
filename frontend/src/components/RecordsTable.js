function RecordsTable({ records }) {

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-4">
        Registros
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full bg-white rounded-2xl shadow-md">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Fecha
              </th>

              <th className="text-left p-4">
                Datos
              </th>

              <th className="text-left p-4">
                PDF
              </th>

            </tr>

          </thead>

          <tbody>

            {
              records.map((record) => (

                <tr
                  key={record.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {new Date(record.created_at).toLocaleString()}
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

                    <a
                        href={`http://127.0.0.1:8000/api/records/${record.id}/pdf/`}
                        target="_blank"
                        rel="noreferrer"
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
                    </a>

                    </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecordsTable;