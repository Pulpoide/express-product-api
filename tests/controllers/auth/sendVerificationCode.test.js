jest.mock('../../../src/services/emailService', () => ({
  sendVerificationCode: jest.fn().mockResolvedValue(true),
  generateVerificationCode: jest.fn().mockReturnValue('123456'),
}));

const request = require('supertest');
const app = require('../../../index');
const PendingUser = require('../../../src/models/PendingUser');
const User = require('../../../src/models/User');
const emailService = require('../../../src/services/emailService');

describe('POST /auth/send-code', () => {
  afterEach(async () => {
    await PendingUser.deleteMany();
    await User.deleteMany();
    jest.clearAllMocks();
  });

  it('should send a verification code to a new email', async () => {
    const email = 'test@example.com';

    const response = await request(app).post('/api/auth/send-code').send({ email });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Código enviado con éxito',
      cooldown: 60,
      nextRequest: expect.any(String),
    });

    const pendingUser = await PendingUser.findOne({ email });
    expect(pendingUser).toBeTruthy();
    expect(pendingUser.verificationCode).toBeDefined();
    expect(emailService.sendVerificationCode).toHaveBeenCalledWith(
      email,
      pendingUser.verificationCode
    );
  });

  it('should return an error if the email is already registered', async () => {
    const email = 'test@example.com';
    await User.create({ email, password: 'password123' });

    const response = await request(app).post('/api/auth/send-code').send({ email });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errors: ['El email ya está registrado'],
    });
  });

  it('should return an error if email is not provided', async () => {
    const response = await request(app).post('/api/auth/send-code').send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errors: ['Debe proporcionar un email válido'],
    });
  });
});
