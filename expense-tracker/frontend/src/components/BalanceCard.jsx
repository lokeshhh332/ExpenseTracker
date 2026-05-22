function BalanceCard({ balance }) {
  return (
    <div className="bg-[#13203a] border border-gray-700 p-8 rounded-3xl shadow-xl">

      <h2 className="text-3xl font-bold text-white">
        Total Balance
      </h2>

      <h1 className="text-6xl font-bold text-green-400 mt-5">
        ₹ {balance}
      </h1>

    </div>
  )
}

export default BalanceCard