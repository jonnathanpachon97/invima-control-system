import { useState } from "react";
import api from "../services/api";

function DynamicForm({ template, companyId }) {

  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await api.post("records/", {
        data: formData,
        company: companyId,
        template: template.id
      });

      alert("Registro guardado");

      console.log(formData);

    } catch (error) {
      console.error(error);
      alert("Error guardando registro");
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <h2>{template.name}</h2>

      {
        template.schema.map((field, index) => (

          <div
            key={index}
            style={{ marginBottom: "15px" }}
          >

            <label>{field.name}</label>

            <br />

            <input
              type={field.type}
              onChange={(e) =>
                handleChange(field.name, e.target.value)
              }
              style={{
                padding: "10px",
                width: "300px"
              }}
            />

          </div>
        ))
      }

      <button type="submit">
        Guardar Registro
      </button>

    </form>
  );
}

export default DynamicForm;