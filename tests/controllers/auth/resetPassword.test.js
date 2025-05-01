const request = require('supertest');
const app = require('../../../index');
const User = require('../../../src/models/User');

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword123'),
}));

describe('POST /auth/reset-password', () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      email: 'test@example.com',
      password: 'oldPassword123',
      resetPasswordToken: 'validToken123',
      resetPasswordExpires: Date.now() + 60 * 60 * 1000, // 1 hour from now
    });
  });

  afterEach(async () => {
    await User.deleteMany();
    jest.clearAllMocks();
  });

  it('should return 400 if passwords do not match', async () => {
    const response = await request(app)
      .post('/api/auth/reset-password')
      .send({
        token: 'validToken123',
        password: 'newPassword123',
        confirmPassword: 'differentPassword123',
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errors: ['Las contraseñas no coinciden'],
    });
  });

  it('should return 400 if the token is invalid or expired', async () => {
    const response = await request(app)
      .post('/api/auth/reset-password')
      .send({
        token: 'invalidToken123',
        password: 'newPassword123',
        confirmPassword: 'newPassword123',
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errors: ['El token es inválido o ha expirado'],
    });
  });

  it('should reset the password successfully', async () => {
    const response = await request(app)
      .post('/api/auth/reset-password')
      .send({
        token: 'validToken123',
        password: 'newPassword123',
        confirmPassword: 'newPassword123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Contraseña restablecida con éxito',
    });

    const updatedUser = await User.findOne({ email: 'test@example.com' });
    expect(updatedUser).toBeTruthy();
    expect(updatedUser.password).toBe('hashedPassword123');
    expect(updatedUser.resetPasswordToken).toBeUndefined();
    expect(updatedUser.resetPasswordExpires).toBeUndefined();
  });
});