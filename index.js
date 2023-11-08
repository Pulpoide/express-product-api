const express = require('express');
const cors = require('cors');
//const pug = require('pug')
const app = express();
const PORT = 8888;
const productsRouter = require('./src/routes/productRoutes');
const viewsController = require('./src/controllers/viewsController')

//nuevo
const db = require('./src/database/db')



app.use(cors());

app.use(express.json());

// Motor de plantilla
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


// Vistas
// HomePage
app.get('/', (req, res) => {
    res.render("index", {titulo: "Mi titulo dinámico"})
})

app.get('/productos', viewsController.mostrarProductos)
app.get('/productos/:code', viewsController.mostrarProducto)
app.get('/producto/crear', viewsController.crearProducto)


// Rutas
app.use("/api/1.0/", productsRouter);

app.use((req, res, next) => {
    res.status(404).json({ message: 'No se encontró la ruta' })
})

app.listen(PORT, () => {
    console.log(`✅ Server escuchando el puerto ${PORT} -> http://localhost:${PORT}/`);
})



