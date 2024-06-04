const express = require("express");
const productRouter = require("./productRoute.js");
const memberRouter = require("./membershipRoute.js");
const rewardRouter = require("./rewardRoute.js");
const router = express.Router();

router.use("/product", productRouter);
router.use("/membership", memberRouter);

module.exports = router;

