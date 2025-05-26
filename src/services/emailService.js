const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationCode = async (email, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Código de Verificación',
    html: `<p>Tu código de verificación es: <strong>${code}</strong></p>`,
  };

  await transporter.sendMail(mailOptions);
};

exports.generateVerificationCode = () => crypto.randomInt(100000, 999999).toString();

exports.sendPasswordResetEmail = async (email, resetUrl) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Restablecimiento de Contraseña',
    html: `
      <p>Has solicitado restablecer tu contraseña.</p>
      <p>Haz clic en el siguiente enlace para restablecerla:</p>
      <a href="${resetUrl}" style="padding: 10px 20px; background-color: #1abc9c; color: white; text-decoration: none;">Restablecer contraseña</a>
      <p>Si no solicitaste este cambio, ignora este correo.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
