const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().flatMap((e) => e.msg.split(','));
    return next(new AppError(messages, 400));
  }

  next();
};
