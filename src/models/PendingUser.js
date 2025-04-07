const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  verificationCode: { type: String, required: true },
  verificationCodeExpires: { type: Date, required: true },
  lastCodeSentAt: { type: Date, required: true, default: Date.now }
});

pendingUserSchema.index(
  { verificationCodeExpires: 1 },
  { expireAfterSeconds: 0 }
);

module.exports = mongoose.model('PendingUser', pendingUserSchema);