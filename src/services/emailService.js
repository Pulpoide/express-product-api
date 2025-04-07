const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendVerificationCode = async (email, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Código de Verificación',
    html: `<p>Tu código de verificación es: <strong>${code}</strong></p>`
  };

  await transporter.sendMail(mailOptions);
};

exports.generateVerificationCode = () => crypto.randomInt(100000, 999999).toString();
