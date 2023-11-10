const db = require('../database/db')
const productController = require('../controllers/productController')
const axios = require('axios')

const mostrarProductos = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8888/api/1.0/products/');
        const data = response.data;

        res.render("productos", { productos: data.products })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error interno' })
    }
}


const mostrarProducto = async (req, res) => {
    let code = req.params.code;

    try {
        const response = await axios.get(`http://localhost:8888/api/1.0/products/${code}`);
        const data = response.data;
        res.render("detalle", { productos: data.products });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error interno" })
    }
}


const crearProducto = async (req, res) => {
    try {
        res.render("crear")
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error interno" })
    }
}

const editarProducto = async (req, res) => {
    let code = req.params.code;

    try {
        const response = await axios.get(`http://localhost:8888/api/1.0/products/${code}`);
        const data = response.data;
        res.render("editar", { producto: data.products[0] });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error interno" })
    }
}

module.exports = { mostrarProductos, mostrarProducto, crearProducto, editarProducto }