import { useState } from "react";
import api from "../services/api";

function DynamicForm({ template, onRecordCreated }) {

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
        template: template.id
      });

      alert("Registro guardado");

      onRecordCreated();
      
      setFormData({});

    } catch (error) {

      console.error(error);
      alert("Error guardando registro");
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        {template.name}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {
          template.schema.map((field, index) => (

            <div key={index}>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                {field.name}
              </label>

              <input
                type={field.type}
                value={formData[field.name] || ""}
                onChange={(e) =>
                  handleChange(field.name, e.target.value)
                }
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
          ))
        }

      </div>

      <button
        type="submit"
        className="
          mt-6
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-3
          rounded-xl
          font-medium
          transition
        "
      >
        Guardar Registro
      </button>

    </form>
  );
}

export default DynamicForm;