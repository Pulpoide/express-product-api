const { body } = require('express-validator');
const User = require('../../models/User');
const PendingUser = require('../../models/PendingUser');

module.exports = {
    signup: [
        body('email')
            .isEmail().withMessage('Debe ser un email válido')
            .normalizeEmail(),
        body('password')
            .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
            .matches(/^(?=.*\d)(?=.*[a-zA-Z])/).withMessage('La contraseña debe contener al menos un número y una letra'),
        body('confirmPassword')
            .custom((value, { req }) => value === req.body.password)
            .withMessage('Las contraseñas no coinciden'),
        body('verificationCode')
            .isLength({ min: 6, max: 6 }).withMessage('El código debe tener 6 dígitos')
            .isNumeric().withMessage('El código debe ser numérico')
    ],

    signin: [
        body('email')
        .isEmail().withMessage('Debe ser un email válido')
        .normalizeEmail()
    ],

    sendCode: [
        body('email')
            .isEmail().withMessage('Debe ser un email válido')
            .normalizeEmail()
            .custom(async (email) => {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    throw new Error('El email ya está registrado');
                }
                return true;
            })
            .custom(async (email) => {
                const pendingUser = await PendingUser.findOne({ email }).lean(); 
                
                if (pendingUser?.lastCodeSentAt) {
                  const tiempoTranscurrido = Date.now() - pendingUser.lastCodeSentAt.getTime(); 
                  const tiempoRestante = Math.ceil((60000 - tiempoTranscurrido) / 1000);
                  
                  if (tiempoRestante > 0) {
                    throw new Error(`Espere ${tiempoRestante} segundos para reenviar el código`);
                  }
                }
                return true;
              })
    ],
};