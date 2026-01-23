# Product Manager App — RESTful API & Product Management System

![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-Framework-000000?logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white) ![Jest](https://img.shields.io/badge/Jest-Testing-C21325?logo=jest&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-Container-2496ED?logo=docker&logoColor=white)

Welcome to the repository for **Product Manager App**, a robust and scalable RESTful API designed for comprehensive product lifecycle management. 

This application combines a high-performance **Backend architecture** with a secure **Authentication system**, providing a complete solution for managing product catalogs, secure user access, and automated data validation.

## Features

- **Full CRUD Operations:** Seamless management (Create, Read, Update, Delete) of product catalogs.
- **Secure Authentication:** Implementation of JWT-based flows, including registration, login, and secure password recovery/reset via email.
- **File Management:** Integrated system for image and file uploads using Multer.
- **Interactive Documentation:** Fully documented API endpoints using Swagger UI for easy testing and integration.
- **Automated Quality Assurance:** High test coverage with unit and integration tests using Jest and Supertest.
- **Security Middlewares:** Hardened security layer featuring CORS, Helmet, and rate-limiting to prevent brute-force attacks.
- **Dynamic Frontend:** Modern, responsive interface built with EJS templates and Bootstrap.

## Tech Stack

- **Backend & Core:** Node.js and Express.js for a fast and minimalist server architecture.
- **Database:** MongoDB Atlas with Mongoose (ODM) for flexible and scalable document-based storage.
- **Security & Auth:** Implementation of JWT (JSON Web Tokens), Bcrypt.js for password hashing, and Helmet for HTTP header protection.
- **Quality & Testing:** Unit and integration testing using Jest and Supertest, ensuring reliable API performance.
- **File Management:** Integrated file upload system utilizing Multer for managing product assets.
- **Documentation:** Interactive API explorer built with Swagger (OpenAPI 3.0).
- **DevOps:** Containerization with Docker for consistent development and deployment environments.

## Project Structure

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

## Installation and Usage

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Pulpoide/aoi2_w2.git](https://github.com/Pulpoide/aoi2_w2.git)
   cd aoi2_w2
    npm install
    npm run dev
    ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:** Create a .env file in the root directory and provide your MongoDB URI, JWT Secret, and Email credentials.
4. **Run the application:**
   ```bash
   npm run dev
   ```

## Automated Testing

This project prioritizes reliability. The test suite uses Jest and a Memory Server to ensure the database remains untouched during execution.
**Run all tests:**
```bash
npm test
```

## API Documentation

Once the server is running, you can explore and interact with the API through Swagger UI:
- **Interactive Docs:** [https://aoi2-w2.onrender.com/api-docs/](https://aoi2-w2.onrender.com/api-docs/)

---

## Author

**Joaquin D. Olivero** Full Stack Developer | Backend Specialist

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/JoaquinOlivero)

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Pulpoide)
