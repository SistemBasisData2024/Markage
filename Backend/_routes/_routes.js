const express = require("express");
const productRouter = require("./productRoute.js");
const router = express.Router();

router.use("/product", productRouter);

module.exports = router;

