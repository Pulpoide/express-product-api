# API Products

API Products es una aplicación backend diseñada para gestionar un CRUD (Crear, Leer, Actualizar, Eliminar) de productos de todo tipo. Esta API está construida con Express.js y permite la gestión eficiente de productos mediante un conjunto de endpoints RESTful.

## Características

- **CRUD completo:** Permite crear, leer, actualizar y eliminar productos.
- **Documentación Swagger:** Documentación automática de la API con Swagger.
- **Soporte para archivos:** Manejo de archivos con Multer para la carga de imágenes u otros tipos de archivos.

## Tecnologías Utilizadas

- **Express.js:** Framework para Node.js.
- **MySQL2:** Conector para MySQL.
- **Axios:** Cliente HTTP para realizar peticiones desde el frontend o pruebas.
- **Swagger:** Para la documentación de la API.
- **Multer:** Para el manejo de archivos.
- **EJS:** Motor de plantillas.
- **Bootstrap:** Para el diseño del frontend (si aplicable).
- **Dotenv:** Para manejar variables de entorno.
- **CORS:** Middleware para permitir solicitudes de otros dominios.
- **Serve-favicon:** Middleware para servir un favicon.

## Estructura del Proyecto

/api/1.0 ├── index.js ├── src │ ├── controllers │ │ ├── productController.js │ │ ├── upload.js │ │ └── viewsController.js │ ├── database │ │ └── db.js │ ├── routes │ │ └── productRoutes.js ├── views │ ├── template │ ├── crear.ejs │ ├── detalle.ejs │ ├── editar.ejs │ ├── index.ejs │ └── productos.ejs ├── public │ ├── images │ ├── video │ └── favicon.ico

## Instalación y Uso

```bash
git clone https://github.com/Pulpoide/aoi2_w2.git
cd aoi2_w2
npm install
node index.js


## Autor

**Joaquin D. Olivero**

