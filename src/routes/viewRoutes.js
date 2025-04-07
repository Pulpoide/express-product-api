const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware')

router.get('/', (req, res) => res.render("index"));

router.get('/signin', authController.getSignIn)
router.get('/signup', authController.getSignUp)

router.get('/product/create', authenticateToken, viewsController.crearProducto);
router.get('/product/:id', authenticateToken, viewsController.mostrarProducto);
router.get('/product/edit/:id', authenticateToken, viewsController.editarProducto);
router.get('/products', authenticateToken, viewsController.mostrarProductos);

module.exports = router;

