const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadImg = require('../controllers/upload')
const productController = require('../controllers/productController')

router
    // Devuelve una lista de todos los productos
    .get("/products", productController.getAllProducts)

    // Devuelve el producto con el código solicitado
    .get("/products/:code", productController.getProduct)

    // Crea un producto
    .post("/products/create", productController.createNewProduct)

    // Para subir imagenes
    .post("/products/uploadImg", uploadImg.upload, productController.addImgProduct)

    // Actualiza un producto
    .put("/products/:code", productController.updateProduct)

    // Elimina un producto
    .delete("/products/:code", productController.deleteProduct);

module.exports = router;