jest.mock('../../../src/services/emailService', () => ({
  sendPasswordResetEmail: jest.fn().mockResolvedValue(true),
}));

const request = require('supertest');
const app = require('../../../index');
const User = require('../../../src/models/User');

describe('POST /auth/forgot-password', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  it('should send a password reset email if the user exists', async () => {
    const email = 'test@example.com';
    await User.create({ email, password: 'password123' });

    const response = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Correo enviado. Revisa tu bandeja de entrada.');
  });

  it('should return 404 if the user does not exist', async () => {
    const response = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: 'nonexistent@example.com' });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body.errors).toContain('No existe una cuenta con este email');
  });
});