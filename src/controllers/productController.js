const Product = require('../models/product');
const AppError = require('../utils/AppError');

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      status: 'OK',
      message: 'Producto creado exitosamente',
      product,
    });
  } catch (error) {
    next(new AppError('Error al crear el producto', 500));
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json({ status: 'OK', products });
  } catch (error) {
    next(new AppError('Database error', 500));
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new AppError('Producto no encontrado', 404));
    res.status(200).json({ status: 'OK', product });
  } catch (error) {
    next(new AppError('Error al obtener el producto', 500));
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
      status: 'OK',
      product,
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
      status: 'OK',
      message: 'Producto eliminado exitosamente',
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
  deleteProduct,
};
