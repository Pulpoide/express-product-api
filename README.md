# Product Manager App

Se trata de una API RESTful construida con **Express.js** y **MongoDB**, diseñada para manejar un CRUD completo de productos. Incluye autenticación JWT, carga de archivos, documentación Swagger, pruebas automatizadas y vistas con EJS.

## Características

- **CRUD de Productos**: Crear, leer, actualizar y eliminar productos.
- **Autenticación JWT**: Registro, inicio de sesión, recuperación y reseteo de contraseñas.
- **Carga de Archivos**: Implementación con Multer para subir imágenes y otros archivos.
- **Pruebas Automatizadas**: Pruebas unitarias e integración con Jest y Supertest.
- **Documentación Interactiva**: Swagger para explorar y probar la API.
- **Vistas Dinámicas**: EJS y Bootstrap para una experiencia de usuario moderna.
- **Middleware de Seguridad**: CORS, Helmet, express-rate-limit, cookie-parser y más.

## Tecnologías 

- **Backend & DB**: Express.js, Node.js, MongoDB Atlas, Mongoose  
- **Seguridad & Utilidades**: JWT, bcryptjs, cors, helmet, rate-limit, cookie-parser  
- **Carga & Frontend**: Multer, EJS, Bootstrap  
- **Calidad & Testing**: Jest, Supertest, mongodb-memory-server, ESLint, Prettier  
- **Docs**: swagger-jsdoc, swagger-ui-express  
- **Env & Scripts**: dotenv, cross-env, nodemon, Docker 

## Estructura del Proyecto

```bash
├── src/
│   ├── config/
│   │   └── db.js
│   ├── constants/
│   │   └── httpStatus.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── uploadController.js
│   │   └── viewsController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   ├── validatorMiddleware.js
│   │   └── validators/
│   │       └── authValidator.js
│   ├── models/
│   │   ├── PendingUser.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── viewRoutes.js
│   ├── services/
│   │   └── emailService.js
│   └── utils/
│       └── AppError.js
├── tests/
│   ├── controllers/
│   │   ├── auth/
│   │   │   ├── forgotPassword.test.js
│   │   │   ├── resetPassword.test.js
│   │   │   ├── sendVerificationCode.test.js
│   │   │   ├── signin.test.js
│   │   │   └── signup.test.js
│   │   └── product/
│   │       ├── createProduct.test.js
│   │       ├── deleteProduct.test.js
│   │       ├── getAllProducts.test.js
│   │       ├── getProductById.test.js
│   │       └── updateProduct.test.js
├── views/
│   ├── create.ejs
│   ├── detail.ejs
│   ├── edit.ejs
│   ├── error.ejs
│   ├── forgotPassword.ejs
│   ├── index.ejs
│   ├── products.ejs
│   ├── resetPassword.ejs
│   ├── signin.ejs
│   ├── signup.ejs
│   └── template/
│       └── header.ejs
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── crear.js
│   │   ├── detalle.js
│   │   ├── editar.js
│   │   ├── forgotPassword.js
│   │   ├── logout.js
│   │   ├── products.js
│   │   ├── resetPassword.js
│   │   ├── signin.js
│   │   └── signup.js
│   ├── images/
│   └── video/
│       └── background.mp4
├── .env
├── Dockerfile
├── index.js
├── package.json
└── README.md
```

## Instalación y Uso

```bash
git clone https://github.com/Pulpoide/aoi2_w2.git
cd aoi2_w2
npm install
npm run dev
```

## Pruebas

```bash
npm test
```

## Documentación

Accede a la documentación interactiva de la API [aquí.](https://verbal-bee-joacolivero-8438cba1.koyeb.app/api-docs/)


## Autor
[**Joaquin D. Olivero**](https://github.com/Pulpoide) -> 
[LinkedIn](https://www.linkedin.com/in/JoaquinOlivero)