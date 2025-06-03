const axios = require('axios');

const mostrarProductos = async (req, res) => {
  const baseUrl = req.app.locals.baseUrl;
  try {
    const response = await axios.get(`${baseUrl}/api/products/`, {
      withCredentials: true,
      headers: { Cookie: req.headers.cookie },
    });
    const data = response.data;
    res.render('products', { products: data.products, user: req.user });
  } catch (error) {
    console.error('⚠️ Error al mostrar los productos:', error);
    if (error.response && error.response.status === 403) {
      return res.redirect('/signin');
    }
    return res.status(500).json({ success: false, errors: ['Error interno'] });
  }
};

const mostrarProducto = async (req, res) => {
  const baseUrl = req.app.locals.baseUrl;
  try {
    const id = req.params.id;
    const response = await axios.get(`${baseUrl}/api/products/${id}`, {
      headers: { Cookie: req.headers.cookie },
    });
    res.render('detail', {
      product: response.data.product,
      defaultImage: '/images/default.jpg',
      user: req.user,
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return res.redirect('/signin');
    }
    console.error('⚠️ Error al obtener el producto:', error);
    return res.status(500).json({ success: false, errors: ['Error interno'] });
  }
};

const crearProducto = async (req, res) => {
  try {
    res.render('create');
  } catch (error) {
    console.error('⚠️ Error al crear el producto:', error);
    return res.status(500).json({ success: false, errors: ['Error interno'] });
  }
};

const editarProducto = async (req, res) => {
  const baseUrl = req.app.locals.baseUrl;
  let id = req.params.id;
  try {
    const cookie = req.headers.cookie;

    const response = await axios.get(`${baseUrl}/api/products/${id}`, {
      headers: {
        Cookie: cookie,
      },
    });
    const data = response.data;
    res.render('edit', { product: data.product, user: req.user });
  } catch (error) {
    console.error('⚠️ Error al editar el producto:', error);
    return res.status(500).json({ success: false, errors: ['Error interno'] });
  }
};

module.exports = { mostrarProductos, mostrarProducto, crearProducto, editarProducto };
