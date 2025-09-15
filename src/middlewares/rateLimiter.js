const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    errors: ['Demasiados intentos. Intente en 5 minutos'],
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
