const db = require('../database/db')
const productController = require('../controllers/productController')
const Producto = require('../models/producto')

const mostrarProductos = async (req, res) => {
    const sqlQuery = 'SELECT * FROM productos';

    try {
        const [rows] = await db.dataBase.query(sqlQuery);
        const productos = rows;

        res.render("productos", {productos: productController.productosConNombreImagen(productos)})
        //res.json([{ status: "OK", products: productController.productosConNombreImagen(productos) }]);        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno" })
    }
}


const mostrarProducto = async (req, res) => {
    let code = req.params.code;
    const sqlQuery = 'SELECT * FROM productos WHERE codigo=?';

    try {
        const [rows] = await db.dataBase.query(sqlQuery, code);
        const productos = rows;
        if (rows.length <= 0) {
            return res.status(404).json({ message: `Producto código: ${code} no encontrado :(` });
        }
        res.render("productos", {productos: productController.productosConNombreImagen(productos)});
    } catch (error) {
        return res.status(500).json({ message: "Error interno" })
    }
}


const crearProducto = async (req, res) => {
    // let nombre = req.body.nombre;
    // let descripcion = req.body.descripcion;
    // let precio = req.body.precio;
    // let marca = req.body.marca;
    // let stock = req.body.stock;
    // let img = null;

    // const body = req.body;
    // const producto = new Producto(body);

    // const values = [nombre, descripcion, precio, marca, stock, img];
    // const sqlQuery = 'INSERT INTO productos (nombre, descripcion, precio, marca, stock, img) VALUES (?, ?, ?, ?, ?, ?)';

    try {
        // await db.dataBase.query(sqlQuery, values);
        res.render("crear")
        //res.send([{ status: "OK", message: "Producto agregado correctamente", product: { code: row.insertId, nombre, descripcion, precio, marca, stock, img } }]);
    } catch (error) {
        return res.status(500).json({ message: "Error interno" })
    }
}


module.exports = { mostrarProductos, mostrarProducto, crearProducto }