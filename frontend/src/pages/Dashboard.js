import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {

    try {

      const response = await api.get("companies/");

      setCompanies(response.data);

      console.log(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>

      <h1>Dashboard INVIMA</h1>

      <h2>Empresas</h2>

      {
        companies.map((company) => (
          <div
            key={company.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <h3>{company.name}</h3>
            <p>NIT: {company.nit}</p>
          </div>
        ))
      }

    </div>
  );
}

export default Dashboard;