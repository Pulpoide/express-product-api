const Product = require('../models/product');
const AppError = require('../utils/AppError');

const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            status: "OK",
            message: "Producto creado exitosamente",
            product
        });
    } catch (error) {
        next(new AppError('Error al crear el producto', 500));
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});

        return res.json({ status:'OK', products });
        
    } catch (error) {
        if (req.accepts('json')) {
            return res.status(500).json({ error: error.message });
        }
        res.redirect('/signin');
    }
};

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .orFail(() => new AppError('Producto no encontrado', 404));

        return res.json({ status:'OK', product });

    } catch (error) {
        if (error.message.includes('Producto no encontrado')) {
            return res.status(404).render('error', { message: 'Producto no encontrado' });
        }
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) return next(new AppError('Producto no encontrado', 404));
        res.status(200).json({
            status: "OK",
            product
        });
    } catch (error) {
        next(new AppError('Error al actualizar el producto', 500));
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return next(new AppError('Producto no encontrado', 404));
        res.status(200).json({
            status: "OK",
            message: 'Producto eliminado exitosamente'
        });
    } catch (error) {
        next(new AppError('Error al eliminar el producto', 500));
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
