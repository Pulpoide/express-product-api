const db = require('../database/db')

// Obtener todos los registros de la tabla productos
const getAllProducts = async (req, res) => {
    const sqlQuery = 'SELECT * FROM productos';

    try {
        const [rows] = await db.dataBase.query(sqlQuery);
        const productos = rows;
        res.json({ status: "OK", products: productos });
    } catch (error) {
        return res.status(500).json({ message: "Error interno" })
    }
};

// Obtener un único registro segun su codigo
const getProduct = async (req, res) => {
    let code = req.params.code;
    const sqlQuery = 'SELECT * FROM productos WHERE codigo=?';

    try {
        const [rows] = await db.dataBase.query(sqlQuery, code);
        const productos = rows;
        if (rows.length <= 0) {
            return res.status(404).json({ message: `Producto código: ${code} no encontrado :(` });
        }

        res.json({ status: "OK", products: productos });
    } catch (error) {
        return res.status(500).json({ message: "Error interno" })
    }
};

// Crear un nuevo registro
const createNewProduct = async (req, res) => {
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let marca = req.body.marca;
    let stock = req.body.stock;
    let img = req.body.img;

    const values = [nombre, descripcion, precio, marca, stock, img.replace(/.*[\/\\]/, '')];
    const sqlQuery = 'INSERT INTO productos (nombre, descripcion, precio, marca, stock, img) VALUES (?, ?, ?, ?, ?, ?)';
    try {
        const [row] = await db.dataBase.query(sqlQuery, values);
        res.status(201);
        res.json({ status: "OK", message: "Producto agregado correctamente", product: { code: row.insertId, nombre, descripcion, precio, marca, stock, img } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno" })
    }
}

// Actualizar completa o parcialmente un registro
const updateProduct = async (req, res) => {
    let code = req.params.code;
    const { nombre, descripcion, precio, marca, stock, img } = req.body;
    const sqlQuery = 'UPDATE productos SET nombre= IFNULL(?, nombre), descripcion= IFNULL(?, descripcion), precio= IFNULL(?, precio), marca= IFNULL(?, marca), stock= IFNULL(?, stock), img= IFNULL(?, img)  WHERE codigo=?';

    try {
        const [result] = await db.dataBase.query(sqlQuery, [nombre, descripcion, precio, marca, stock, img.replace(/.*[\/\\]/, ''), code]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }
        const [row] = await db.dataBase.query('select * from productos where codigo = ?', code)
        res.json(row)
    } catch (error) {
        return res.status(500).json({ message: "Error interno" })
    }
}

// Eliminar un registro
const deleteProduct = async (req, res) => {
    let code = req.params.code;
    const sqlQuery = 'DELETE from productos WHERE codigo=?';
    try {
        const [result] = await db.dataBase.query(sqlQuery, code);

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'No se pudo eliminar el producto' })
        }
        res.json({ message: `Producto (${code}) eliminado correctamente` })
    } catch (error) {
        return res.status(500).json({ message: "Error interno" })
    }
}

// Agregar img a un producto
const addImgProduct = async (req, res) => {

    try {
        res.json({ message: "Img cargada exitosamente" })
    } catch (error) {
        return res.status(500).json({ message: "Error interno" })
    }
}


module.exports = {
    getAllProducts,
    getProduct,
    createNewProduct,
    updateProduct,
    deleteProduct,
    addImgProduct
};