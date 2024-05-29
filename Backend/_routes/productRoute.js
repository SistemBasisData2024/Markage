const express = require("express");
const productController = require("../_controllers/productController");
const productRouter = express.Router();

productRouter.get(`/getAll`, productController.getAllProducts);
productRouter.get(`/getByName`, productController.getProductByName);
productRouter.get(`/getByType`, productController.getProductByType);
productRouter.get(`/getById/:id`, productController.getProductById);
productRouter.post(`/addProduct`, productController.addProduct);
productRouter.put(`/updateProduct`, productController.updateProduct);
productRouter.delete(`/deleteProduct`, productController.deleteProduct);

module.exports = productRouter;