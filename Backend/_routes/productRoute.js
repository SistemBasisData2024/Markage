const express = require("express");
const productController = require("../_controllers/productController");
const productRouter = express.Router();

productRouter.get(``, productController.getAllProducts);
productRouter.get(`/getByName`, productController.getProductByName);
productRouter.get(`/getByType`, productController.getProductByType);
productRouter.get(`/:id`, productController.getProductById);
productRouter.post(``, productController.addProduct);
productRouter.put(`/:id`, productController.updateProduct);
productRouter.delete(`/:id`, productController.deleteProduct);

module.exports = productRouter;