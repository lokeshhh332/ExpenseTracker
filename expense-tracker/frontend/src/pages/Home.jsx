import { useState, useEffect } from "react"

import { CSVLink } from "react-csv"

import {
  ToastContainer,
  toast
} from "react-toastify"

import Navbar from "../components/Navbar"
import BalanceCard from "../components/BalanceCard"
import IncomeExpense from "../components/IncomeExpense"
import TransactionForm from "../components/TransactionForm"
import Chart from "../components/Chart"

function Home() {

  const [transactions, setTransactions] = useState([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const [editingIndex, setEditingIndex] = useState(null)

  const [editTitle, setEditTitle] = useState("")
  const [editAmount, setEditAmount] = useState("")
  const [editType, setEditType] = useState("Income")

  useEffect(() => {

    const savedTransactions =
      JSON.parse(localStorage.getItem("transactions"))

    if (savedTransactions) {
      setTransactions(savedTransactions)
    }

  }, [])

  useEffect(() => {

    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    )

  }, [transactions])

  const addTransaction = (newTransaction) => {

    setTransactions([...transactions, newTransaction])

    toast.success("Transaction Added")
  }

  const deleteTransaction = (index) => {

    const updatedTransactions =
      transactions.filter((item, i) => i !== index)

    setTransactions(updatedTransactions)

    toast.error("Transaction Deleted")
  }

  const startEdit = (item, index) => {

    setEditingIndex(index)

    setEditTitle(item.title)
    setEditAmount(item.amount)
    setEditType(item.type)
  }

  const saveEdit = () => {

    const updatedTransactions = [...transactions]

    updatedTransactions[editingIndex] = {
      title: editTitle,
      amount: editAmount,
      type: editType
    }

    setTransactions(updatedTransactions)

    setEditingIndex(null)

    toast.info("Transaction Updated")
  }

  const income = transactions
    .filter((item) => item.type === "Income")
    .reduce((acc, item) => acc + Number(item.amount), 0)

  const expense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((acc, item) => acc + Number(item.amount), 0)

  const balance = income - expense

  const totalTransactions = transactions.length

  const savings =
    balance > 0 ? balance : 0

  const filteredTransactions =
    transactions.filter((item) => {

      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesFilter =
        filter === "All"
          ? true
          : item.type === filter

      return matchesSearch && matchesFilter
    })

  return (
    <div className="min-h-screen bg-[#0b1220] text-white px-4 py-6">

      <ToastContainer />

      <div className="max-w-6xl mx-auto">

        <Navbar />

        <div className="mt-6">
          <BalanceCard balance={balance} />
        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-5">

          <div className="bg-[#131c31] border border-gray-700 p-5 rounded-2xl">

            <h3 className="text-gray-400">
              Total Transactions
            </h3>

            <h1 className="text-3xl font-bold mt-2">
              {totalTransactions}
            </h1>

          </div>

          <div className="bg-[#131c31] border border-gray-700 p-5 rounded-2xl">

            <h3 className="text-gray-400">
              Total Income
            </h3>

            <h1 className="text-3xl font-bold text-green-400 mt-2">
              ₹ {income}
            </h1>

          </div>

          <div className="bg-[#131c31] border border-gray-700 p-5 rounded-2xl">

            <h3 className="text-gray-400">
              Total Expense
            </h3>

            <h1 className="text-3xl font-bold text-red-400 mt-2">
              ₹ {expense}
            </h1>

          </div>

          <div className="bg-[#131c31] border border-gray-700 p-5 rounded-2xl">

            <h3 className="text-gray-400">
              Savings
            </h3>

            <h1 className="text-3xl font-bold text-blue-400 mt-2">
              ₹ {savings}
            </h1>

          </div>

        </div>

        <div className="mt-5">
          <IncomeExpense
            income={income}
            expense={expense}
          />
        </div>

        <div className="mt-5">
          <TransactionForm
            addTransaction={addTransaction}
          />
        </div>

        <div className="mt-5">
          <Chart
            income={income}
            expense={expense}
          />
        </div>

        <div className="flex justify-end mt-5">

          <CSVLink
            data={transactions}
            filename={"expense-report.csv"}
            className="bg-green-500 text-black px-5 py-3 rounded-xl font-semibold"
          >
            Download CSV
          </CSVLink>

        </div>

        <div className="mt-6">

          <h2 className="text-2xl font-semibold mb-4">
            Recent Transactions
          </h2>

          <input
            type="text"
            placeholder="Search transaction..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#131c31] border border-gray-700 p-4 rounded-2xl outline-none mb-5 text-white"
          />

          <div className="flex gap-3 mb-5">

            <button
              onClick={() => setFilter("All")}
              className={
                filter === "All"
                  ? "bg-white text-black px-4 py-2 rounded-xl"
                  : "bg-[#131c31] border border-gray-700 px-4 py-2 rounded-xl"
              }
            >
              All
            </button>

            <button
              onClick={() => setFilter("Income")}
              className={
                filter === "Income"
                  ? "bg-green-500 text-black px-4 py-2 rounded-xl"
                  : "bg-[#131c31] border border-gray-700 px-4 py-2 rounded-xl"
              }
            >
              Income
            </button>

            <button
              onClick={() => setFilter("Expense")}
              className={
                filter === "Expense"
                  ? "bg-red-500 text-white px-4 py-2 rounded-xl"
                  : "bg-[#131c31] border border-gray-700 px-4 py-2 rounded-xl"
              }
            >
              Expense
            </button>

          </div>

          <div className="space-y-3">

  {
    filteredTransactions.length === 0 ? (

      <div className="bg-[#131c31] border border-dashed border-gray-600 rounded-2xl p-10 text-center">

        <h2 className="text-2xl font-bold text-gray-300">
          No Transactions Found
        </h2>

        <p className="text-gray-500 mt-3">
          Add a transaction to start tracking your expenses.
        </p>

      </div>

    ) : (

      filteredTransactions.map((item, index) => (

        <div
          key={index}
          className="bg-[#131c31] border border-gray-700 rounded-2xl px-5 py-4 flex justify-between items-center"
        >

          {
            editingIndex === index ? (

              <div className="w-full flex flex-col gap-3">

                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) =>
                    setEditTitle(e.target.value)
                  }
                  className="bg-[#0b1220] p-3 rounded-xl outline-none"
                />

                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) =>
                    setEditAmount(e.target.value)
                  }
                  className="bg-[#0b1220] p-3 rounded-xl outline-none"
                />

                <select
                  value={editType}
                  onChange={(e) =>
                    setEditType(e.target.value)
                  }
                  className="bg-[#0b1220] p-3 rounded-xl outline-none"
                >
                  <option>Income</option>
                  <option>Expense</option>
                </select>

                <button
                  onClick={saveEdit}
                  className="bg-green-500 text-black px-4 py-2 rounded-xl"
                >
                  Save
                </button>

              </div>

            ) : (

              <>
                <div>

                  <h3 className="text-lg font-medium">
                    {item.title}
                  </h3>

                  <p
                    className={
                      item.type === "Income"
                        ? "text-green-400 text-sm mt-1"
                        : "text-red-400 text-sm mt-1"
                    }
                  >
                    {item.type}
                  </p>

                </div>

                <div className="text-right">

                  <h2
                    className={
                      item.type === "Income"
                        ? "text-green-400 text-xl font-semibold"
                        : "text-red-400 text-xl font-semibold"
                    }
                  >
                    ₹ {item.amount}
                  </h2>

                  <div className="flex gap-2 mt-2">

                    <button
                      onClick={() =>
                        startEdit(item, index)
                      }
                      className="text-sm bg-blue-500 px-4 py-1 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteTransaction(index)
                      }
                      className="text-sm bg-red-500 px-4 py-1 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              </>

            )
          }

        </div>

      ))

    )
  }

</div>

        </div>

      </div>

    </div>
  )
}

export default Home