const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const HTTP_STATUS = require('../constants/httpStatus');

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const acceptHtml = req.accepts('html');
    const acceptJson = req.accepts('json');

    if (!token) {
      if (acceptHtml) return res.redirect('/signin');
      if (acceptJson) throw new AppError('Acceso no autorizado', HTTP_STATUS.UNAUTHORIZED);
      return res.status(HTTP_STATUS.FORBIDDEN).send('Formato no soportado');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isVerified) {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      const message = user ? 'Cuenta desactivada' : 'Usuario no encontrado';
      throw new AppError(message, HTTP_STATUS.UNAUTHORIZED);
    }

    req.user = user;
    next();
  } catch (error) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    console.error(`[AUTH ERROR] ${error.message}`, {
      endpoint: req.originalUrl,
      ip: req.ip,
    });

    if (req.accepts('html')) return res.redirect('/signin');
    next(error);
  }
};

module.exports = authenticateToken;
