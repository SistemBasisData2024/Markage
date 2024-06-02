const express = require("express");
const productController = require("../_controllers/productController");
const productRouter = express.Router();

productRouter.get(`/getAll`, productController.getAllProducts);
productRouter.get(`/getByName/:name`, productController.getProductByName);
productRouter.get(`/getByType/:type`, productController.getProductByType);
productRouter.get(`/getById/:id`, productController.getProductById);
productRouter.post(`/addProduct`, productController.addProduct);
productRouter.put(`/updateProduct/:id`, productController.updateProduct);
productRouter.delete(`/deleteProduct/:id`, productController.deleteProduct);

module.exports = productRouter;