import { useEffect, useState } from "react";

import api from "../services/api";
import DynamicForm from "../components/DynamicForm";

function Dashboard() {

  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {

    try {

      const response = await api.get("form-templates/");
      setTemplates(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>

      <h1>Dashboard INVIMA</h1>

      <hr />

      {
        templates.map((template) => (

          <div
            key={template.id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              marginBottom: "20px"
            }}
          >

            <DynamicForm
              template={template}
              companyId={1}
            />

          </div>
        ))
      }

    </div>
  );
}

export default Dashboard;