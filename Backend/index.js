const express = require('express')
const app = express()
const cors = require("cors");
const connectDB = require('./connector.js');
const PORT = process.env.PORT || 3000;
const routes = require("./_routes/_routes.js");
const productRouter = require('./_routes/productRoute.js');

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectDB.connectDB();
app.use(routes);

app.listen(PORT, () => {
    console.log('Server listening on port', PORT)   
});