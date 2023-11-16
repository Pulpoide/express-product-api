const express = require('express');
const router = express.Router();
const uploadImg = require('../controllers/upload')
const productController = require('../controllers/productController')

router
    // Devuelve una lista de todos los productos
    .get("/products", productController.getAllProducts)

    // Devuelve el producto con el código solicitado
    .get("/products/:code", productController.getProduct)

    // Crea un producto
    .post("/products/create", productController.createNewProduct)

    // Actualiza un producto
    .put("/products/update/:code", productController.updateProduct)

    // Para cargar la imagen a la carpeta local
    .post("/products/uploadImg", uploadImg.upload, productController.addImgProduct)

    // Elimina un producto
    .delete("/products/delete/:code", productController.deleteProduct);

module.exports = router;