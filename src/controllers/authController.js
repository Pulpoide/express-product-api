const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const PendingUser = require('../models/PendingUser');
const {
  generateVerificationCode,
  sendVerificationCode,
  sendPasswordResetEmail,
} = require('../services/emailService');
const AppError = require('../utils/AppError');

exports.getSignUp = (req, res) => {
  res.render('signup');
};
exports.getSignIn = (req, res) => {
  res.render('signin');
};

exports.postSignUp = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { email, password, verificationCode } = req.body;

    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new AppError('El usuario ya existe', 400);
    }

    if (password !== req.body.confirmPassword) {
      throw new AppError('Las contraseñas no coinciden', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      password: hashedPassword,
      isVerified: true,
    });

    await newUser.save({ session });
    await session.commitTransaction();
    session.endSession();

    const pendingUser = await PendingUser.findOne({
      email,
      verificationCode,
      verificationCodeExpires: { $gt: Date.now() },
    });

    if (!pendingUser) {
      throw new AppError('Código inválido o expirado', 400);
    }

    await PendingUser.deleteOne({ email });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    res.status(201).json({
      success: true,
      userId: newUser._id,
      email: newUser.email,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

exports.sendVerificationCode = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const { email } = req.body;

    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      await session.commitTransaction();
      throw new AppError('El email ya está registrado', 400);
    }

    const verificationCode = generateVerificationCode();
    const updateData = {
      verificationCode,
      verificationCodeExpires: new Date(Date.now() + 15 * 60 * 1000),
      lastCodeSentAt: Date.now(),
    };

    await sendVerificationCode(email, verificationCode);
    await session.commitTransaction();
    session.endSession();

    const updatedPendingUser = await PendingUser.findOneAndUpdate(
      { email },
      {
        $set: {
          verificationCode,
          verificationCodeExpires: updateData.verificationCodeExpires,
          lastCodeSentAt: updateData.lastCodeSentAt,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    if (!updatedPendingUser) {
      throw new AppError('Error al crear o actualizar el usuario pendiente', 500);
    }

    res.status(200).json({
      success: true,
      message: 'Código enviado con éxito',
      cooldown: 60,
      nextRequest: new Date(Date.now() + 60000).toISOString(),
    });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    next(error);
  } finally {
    session.endSession();
  }
};

exports.postSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError(
        errors.array().map((e) => e.msg),
        400
      );
    }

    const user = await User.findOne({ email }).select('+password').lean();

    const validPassword = user
      ? await bcrypt.compare(password, user.password)
      : await bcrypt.compare(password, '$2b$12$dummyhashdummyhashdummyha');

    if (!user || !validPassword) {
      throw new AppError('Datos inválidos', 401);
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600000,
    });

    res.status(200).json({
      success: true,
      userId: user._id,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = Date.now() + 60 * 60 * 1000;

    const updateData = {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetTokenExpires,
      lastCodeSentAt: new Date(),
    };

    const user = await User.findOneAndUpdate({ email }, { $set: updateData }, { new: true });

    if (!user) {
      throw new AppError('No existe una cuenta con este email', 404);
    }

    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

    await sendPasswordResetEmail(email, resetUrl);

    res.status(200).json({
      success: true,
      message: 'Correo enviado. Revisa tu bandeja de entrada.',
      cooldown: 60,
      nextRequest: new Date(Date.now() + 60000).toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { token, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      throw new AppError('Las contraseñas no coinciden', 400);
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new AppError('El token es inválido o ha expirado', 400);
    }

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Contraseña restablecida con éxito',
    });
  } catch (error) {
    next(error);
  }
};
