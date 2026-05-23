import { useEffect, useState } from "react";

import api from "../services/api";
import DynamicForm from "../components/DynamicForm";
import RecordsTable from "../components/RecordsTable";

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

  return (
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

                <DynamicForm
                  template={template}
                  companyId={1}
                />

              </div>
            ))
          }

        </div>
          <RecordsTable records={records} />
      </div>

    </div>
  );
}

export default Dashboard;