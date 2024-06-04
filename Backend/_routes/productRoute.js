const express = require("express");
const productController = require("../_controllers/productController");
const productRouter = express.Router();

productRouter.get('/all', productController.getAllProducts);
productRouter.get(``, productController.getListedProducts);
productRouter.get(`/search`, productController.getProductByKey);
productRouter.get(`/:id`, productController.getProductById);
productRouter.put(`/:id`, productController.updateProduct);
productRouter.put(`/unlist/:id`, productController.unlistProduct);
productRouter.put('/relist/:id', productController.relistProduct)
productRouter.post(``, productController.addProduct);

module.exports = productRouter;