const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const path = require('path');
const productsRouter = require('./src/routes/productRoutes');
const viewsController = require('./src/controllers/viewsController')
const favicon = require('serve-favicon')
const app = express();
const PORT = 8888;



app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors());

app.use(express.json());

app.use(favicon(path.join(__dirname + '/public/favicon.ico')));

// Motor de plantilla
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


// Vistas
//home
app.get('/', (req, res) => { res.render("index") })
//mostrar todos
app.get('/productos', viewsController.mostrarProductos)
//mostrar 1
app.get('/productos/:code', viewsController.mostrarProducto)
//crear
app.get('/producto/crear', viewsController.crearProducto)
//editar
app.get('/producto/editar/:code', viewsController.editarProducto)
// -------------------------------------------------------------


// Rutas API
app.use("/api/1.0/", productsRouter);

app.use((req, res, next) => {
    res.status(404).json({ message: 'No se encontró la ruta' })
})

app.listen(PORT, () => {
    console.log(`✅ Server escuchando el puerto ${PORT} -> http://localhost:${PORT}/`);
})



