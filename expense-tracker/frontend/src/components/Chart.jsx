import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

function Chart({ income, expense }) {

  const data = [
    {
      name: "Income",
      value: income
    },
    {
      name: "Expense",
      value: expense
    }
  ]

  const COLORS = ["#3b82f6", "#ef4444"]

  return (
    <div className="bg-[#13203a] border border-gray-700 p-6 rounded-3xl shadow-xl mt-6">

      <h2 className="text-3xl font-bold mb-6 text-white">
        Expense Distribution
      </h2>

      <div className="w-full h-[350px]">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={120}
              label
            >

              {
                data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))
              }

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default Chart