const express = require("express")

const router = express.Router()

const Transaction =
  require("../models/Transaction")

router.get("/", async (req, res) => {

  try {

    const transactions =
      await Transaction.find()

    res.json(transactions)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
})

router.post("/", async (req, res) => {

  try {

    const transaction =
      new Transaction(req.body)

    const savedTransaction =
      await transaction.save()

    res.status(201).json(savedTransaction)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
})

module.exports = router