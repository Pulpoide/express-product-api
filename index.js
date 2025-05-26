const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');

require('dotenv').config();
console.log(`🌍 Entorno actual: ${process.env.NODE_ENV}`);

const productsRoutes = require('./src/routes/productRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const viewRoutes = require('./src/routes/viewRoutes');
const authRoutes = require('./src/routes/authRoutes');
const swaggerJSON = require('./openapi.json');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 8888;

require('./src/config/db');

// Core Middleware
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://cdn.jsdelivr.net', "'unsafe-eval'"],
      scriptSrcAttr: ["'none'"],
      styleSrc: ["'self'", 'https://cdn.jsdelivr.net', "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdn.jsdelivr.net'],
      objectSrc: ["'none'"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      mediaSrc: ["'self'"],
    },
  })
);
app.use(
  cors({
    origin: 'http://localhost:8888',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(cookieParser());

// Carpeta estática
app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: 86400000,
    setHeaders: (res, path) => {
      if (path.endsWith('.ico')) {
        res.setHeader('Cache-Control', 'public, max-age=2592000');
      }
    },
  })
);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Motor de plantilla
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSON));

// Rutas
app.use('/', viewRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);

// Middlewares
app.use((req, res, next) => {
  next(new (require('./src/utils/AppError'))('Endpoint not found', 404));
});
app.use(require('./src/middlewares/errorHandler'));

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`✅ Server escuchando el puerto ${PORT} -> http://localhost:${PORT}/`);
  });
} else {
  console.log('🧪 Modo de prueba: El servidor no se iniciará.');
}

module.exports = app;
