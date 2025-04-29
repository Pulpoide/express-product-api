const HTTP_STATUS = require('../constants/httpStatus');

const errorHandler = (err, req, res, next) => {

    const requestInfo = req ? {
        path: req.originalUrl,
        method: req.method,
        ip: req.ip
    } : {};

    if (process.env.NODE_ENV !== 'test') {
        console.error(`[ERROR] ${err.message}`, {
            ...requestInfo,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }

    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_ERROR;
    const response = {
        success: false,
        errors: []
    };

    if (err.code === 11000) {
        response.errors.push('El recurso ya existe');
    } else if (err.name === 'ValidationError') {
        response.errors = Object.values(err.errors).map(val => val.message);
    } else if (err instanceof require('../utils/AppError')) {
        response.errors.push(err.message);
    } else {
        response.errors.push(err.message || 'Error interno del servidor');
    }

    if (!res.headersSent) {
        res.status(statusCode).json(response);
    }
};

module.exports = errorHandler;