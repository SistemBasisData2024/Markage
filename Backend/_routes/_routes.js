const express = require("express");
const productRouter = require("./productRoute.js");
const transactionRouter = require("./transactionRoute.js");
const membershipRouter = require("./membershipRoute.js");
const rewardRouter = require("./rewardRoute.js");
const router = express.Router();

router.use("/product", productRouter);
router.use("/transaction",transactionRouter);
router.use("/membership",membershipRouter);
router.use("/reward",rewardRouter);

module.exports = router;

