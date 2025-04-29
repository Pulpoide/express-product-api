const request = require('supertest');
const app = require('../../../index');
const PendingUser = require('../../../src/models/PendingUser');
const User = require('../../../src/models/User');

describe('POST /auth/signup', () => {
  afterAll(async () => {
    await PendingUser.deleteMany({});
    await User.deleteMany({});
  });

  it('should register a user successfully', async () => {
    const pendingUser = new PendingUser({
      email: 'test@example.com',
      verificationCode: '123456',
      verificationCodeExpires: new Date(Date.now() + 15 * 60 * 1000),
    });
    await pendingUser.save();

    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        verificationCode: '123456',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('userId');
    expect(response.body).toHaveProperty('email', 'test@example.com');

    const user = await User.findOne({ email: 'test@example.com' });
    expect(user).not.toBeNull();
    expect(user.email).toBe('test@example.com');
    expect(user.isVerified).toBe(true);

    const deletedPendingUser = await PendingUser.findOne({ email: 'test@example.com' });
    expect(deletedPendingUser).toBeNull();
  });

  it('should return an error for invalid verification code', async () => {
    const pendingUser = new PendingUser({
      email: 'invalid@example.com',
      verificationCode: '654321',
      verificationCodeExpires: new Date(Date.now() + 15 * 60 * 1000),
    });
    await pendingUser.save();

    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'invalid@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        verificationCode: 'wrongcode',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body.errors).toContain('El código debe tener 6 dígitos');
    expect(response.body.errors).toContain('El código debe ser numérico');
  });

  it('should return an error if passwords do not match', async () => {
    const pendingUser = new PendingUser({
      email: 'mismatch@example.com',
      verificationCode: '123456',
      verificationCodeExpires: new Date(Date.now() + 15 * 60 * 1000),
    });
    await pendingUser.save();

    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'mismatch@example.com',
        password: 'Password123',
        confirmPassword: 'Password456',
        verificationCode: '123456',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body.errors).toContain('Las contraseñas no coinciden');
  });

  it('should return an error if the user already exists', async () => {
    const existingUser = new User({
      email: 'exists@example.com',
      password: 'Password123',
      isVerified: true,
    });
    await existingUser.save();

    const pendingUser = new PendingUser({
      email: 'exists@example.com',
      verificationCode: '123456',
      verificationCodeExpires: new Date(Date.now() + 15 * 60 * 1000),
    });
    await pendingUser.save();

    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'exists@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        verificationCode: '123456',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body.errors).toContain('El usuario ya existe');
  });
});