const express = require("express");
const transactionController = require("../_controllers/transactionController");
const transactionRouter = express.Router();

transactionRouter.get("", transactionController.getAllTransactions);
transactionRouter.get("/:id", transactionController.getTransactionById);
transactionRouter.post("", transactionController.addTransaction);

module.exports = transactionRouter;