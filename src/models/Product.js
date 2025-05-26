const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
    },
    marca: {
      type: String,
      required: [true, 'La marca es obligatoria'],
    },
    stock: {
      type: Number,
      required: [true, 'El stock es obligatorio'],
    },
    img: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
