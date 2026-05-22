import { useState } from "react"

function TransactionForm({ addTransaction }) {

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("Income")

  const handleSubmit = (e) => {
    e.preventDefault()

    const transaction = {
      title,
      amount,
      type
    }

    addTransaction(transaction)

    setTitle("")
    setAmount("")
    setType("Income")
  }

  return (
    <div className="bg-[#13203a] border border-gray-700 p-6 rounded-3xl shadow-xl mt-6">

      <h2 className="text-3xl font-bold mb-6 text-white">
        Add Transaction
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-[#071227] border border-gray-600 text-white p-4 rounded-2xl outline-none"
        />

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-[#071227] border border-gray-600 text-white p-4 rounded-2xl outline-none"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-[#071227] border border-gray-600 text-white p-4 rounded-2xl outline-none"
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        <button className="bg-green-500 text-black font-bold p-4 rounded-2xl text-lg">
          Add Transaction
        </button>

      </form>

    </div>
  )
}

export default TransactionForm