import { useState } from "react";

import api from "../services/api";

function CreateTemplate() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [fields, setFields] = useState([
    {
      name: "",
      type: "text"
    }
  ]);

  const addField = () => {

    setFields([
      ...fields,
      {
        name: "",
        type: "text"
      }
    ]);
  };

  const updateField = (
    index,
    key,
    value
  ) => {

    const updatedFields = [...fields];

    updatedFields[index][key] = value;

    setFields(updatedFields);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "form-templates/",
        {
          name,
          description,
          schema: fields
        }
      );

      alert("Formato creado");

      setName("");
      setDescription("");

      setFields([
        {
          name: "",
          type: "text"
        }
      ]);

    } catch (error) {

      console.error(error);
      alert("Error creando formato");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">

        <h1 className="text-3xl font-bold mb-8">
          Crear Formato
        </h1>

        <form onSubmit={handleSubmit}>

          <div className="mb-5">

            <label className="block mb-2">
              Nombre
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />

          </div>

          <div className="mb-8">

            <label className="block mb-2">
              Descripción
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />

          </div>

          <h2 className="text-2xl font-semibold mb-4">
            Campos
          </h2>

          {
            fields.map((field, index) => (

              <div
                key={index}
                className="grid grid-cols-2 gap-4 mb-4"
              >

                <input
                  type="text"
                  placeholder="Nombre campo"
                  value={field.name}
                  onChange={(e) =>
                    updateField(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  className="
                    border
                    rounded-xl
                    px-4
                    py-3
                  "
                />

                <select
                  value={field.type}
                  onChange={(e) =>
                    updateField(
                      index,
                      "type",
                      e.target.value
                    )
                  }
                  className="
                    border
                    rounded-xl
                    px-4
                    py-3
                  "
                >

                  <option value="text">
                    Texto
                  </option>

                  <option value="number">
                    Número
                  </option>

                  <option value="time">
                    Hora
                  </option>

                  <option value="date">
                    Fecha
                  </option>

                </select>

              </div>
            ))
          }

          <button
            type="button"
            onClick={addField}
            className="
              bg-gray-200
              px-5
              py-3
              rounded-xl
              mr-4
            "
          >
            + Agregar Campo
          </button>

          <button
            type="submit"
            className="
              bg-blue-600
              text-white
              px-5
              py-3
              rounded-xl
            "
          >
            Guardar Formato
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateTemplate;