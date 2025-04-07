const HTTP_STATUS = require('../constants/httpStatus');

const errorHandler = (err, req, res, next) => {

    const requestInfo = req ? {
        path: req.originalUrl,
        method: req.method,
        ip: req.ip
    } : {};

    console.error(`[ERROR] ${err.message}`, {
        ...requestInfo,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });

    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_ERROR;
    const response = {
        status: "error",
        message: err.message || "Error interno del servidor",
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };

    if (err.code === 11000) {
        response.message = 'El recurso ya existe';
        response.errors = { duplicate: Object.keys(err.keyPattern) };
    }

    if (err.name === 'ValidationError') {
        response.message = 'Datos inválidos';
        response.errors = Object.fromEntries(
            Object.entries(err.errors).map(([key, val]) => [key, val.message])
        );
    }

    if (!res.headersSent) {
        res.status(statusCode).json(response);
    }
};

module.exports = errorHandler;