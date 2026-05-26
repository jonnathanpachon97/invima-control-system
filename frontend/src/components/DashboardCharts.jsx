import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function DashboardCharts({ records }) {

  const recordsByDate = {};

  records.forEach((record) => {

    const date = new Date(
      record.created_at
    ).toLocaleDateString();

    if (!recordsByDate[date]) {
      recordsByDate[date] = 0;
    }

    recordsByDate[date] += 1;
  });

  const chartData = Object.entries(
    recordsByDate
  ).map(([date, total]) => ({
    date,
    total
  }));

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        mb-8
      "
    >

      <h2 className="text-2xl font-bold mb-6">
        Registros por Día
      </h2>

      <div style={{ width: "100%", height: 350 }}>

        <ResponsiveContainer>

          <BarChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="total"
              fill="#2563eb"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default DashboardCharts;