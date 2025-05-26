const HTTP_STATUS = require('../constants/httpStatus');
const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, _next) => {
  const requestInfo = req
    ? {
        path: req.originalUrl,
        method: req.method,
        ip: req.ip,
      }
    : {};

  // Silenciar logs de rutas automáticas (como Chrome DevTools)
  const silentPaths = [
    '/.well-known/appspecific/com.chrome.devtools.json',
    '/.well-known/',
  ];
  const isSilent = silentPaths.some((p) => req.originalUrl.startsWith(p));

  if (process.env.NODE_ENV !== 'test' && !isSilent) {
    console.error('[ERROR HANDLER]', {
      mensaje: err && err.message ? err.message : String(err),
      codigo: err && err.statusCode ? err.statusCode : 500,
      ...requestInfo,
      stack: process.env.NODE_ENV === 'development' && err && err.stack ? err.stack : undefined,
    });
  }

  const statusCode = (err && err.statusCode) || HTTP_STATUS.INTERNAL_ERROR;
  const response = {
    success: false,
    errors: [],
  };

  if (err && err.code === 11000) {
    response.errors.push('El recurso ya existe');
  } else if (err && err.name === 'ValidationError') {
    response.errors = Object.values(err.errors || {}).map((val) => val.message);
  } else if (err instanceof AppError) {
    if (Array.isArray(err.errors) && err.errors.length > 0) {
      response.errors = response.errors.concat(err.errors);
    } else if (Array.isArray(err.message)) {
      response.errors = response.errors.concat(err.message);
    } else {
      response.errors.push(err.message);
    }
  } else if (err && err.message) {
    response.errors.push(err.message);
  } else if (typeof err === 'string') {
    response.errors.push(err);
  } else {
    response.errors.push('Error interno del servidor');
  }

  if (!res.headersSent) {
    res.status(statusCode).json(response);
  }
};

module.exports = errorHandler;
