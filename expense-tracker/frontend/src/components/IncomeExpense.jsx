function IncomeExpense({ income, expense }) {
  return (
    <div className="grid md:grid-cols-2 gap-5 mt-5">

      <div className="bg-[#13203a] border border-blue-500 p-6 rounded-3xl">

        <h2 className="text-2xl font-bold text-white">
          Income
        </h2>

        <h1 className="text-5xl font-bold text-blue-400 mt-4">
          ₹ {income}
        </h1>

      </div>

      <div className="bg-[#13203a] border border-red-500 p-6 rounded-3xl">

        <h2 className="text-2xl font-bold text-white">
          Expense
        </h2>

        <h1 className="text-5xl font-bold text-red-400 mt-4">
          ₹ {expense}
        </h1>

      </div>

    </div>
  )
}

export default IncomeExpense