const express = require("express");
const transactionController = require("../_controllers/transactionController");
const transactionRouter = express.Router();

transactionRouter.get("/getAll", transactionController.getAllTransactions);
transactionRouter.get("/getTransactionById/:id", transactionController.getTransactionById);
transactionRouter.post("/addTransaction", transactionController.addTransaction);


module.exports = transactionRouter;