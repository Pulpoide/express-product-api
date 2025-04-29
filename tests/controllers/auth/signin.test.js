const request = require('supertest');
const app = require('../../../index');
const User = require('../../../src/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('POST /auth/signin', () => {
  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash('Password123', 12);
    const user = new User({
      email: 'testuser@example.com',
      password: hashedPassword,
      isVerified: true
    });
    await user.save();
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  it('should sign in a user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'testuser@example.com',
        password: 'Password123'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('userId');
    expect(response.body).toHaveProperty('email', 'testuser@example.com');
    expect(response.headers['set-cookie']).toBeDefined();

    const token = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded).toHaveProperty('userId');
  });

  it('should return an error for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'testuser@example.com',
        password: 'WrongPassword'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toContain('Datos inválidos');
  });

  it('should return an error for non-existent user', async () => {
    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'nonexistent@example.com',
        password: 'Password123'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toContain('Datos inválidos');
  });

  it('should return validation errors for missing fields', async () => {
    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        email: ''
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('errors');
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors).toContain('Debe ser un email válido');
  });

  it('should handle unexpected errors gracefully', async () => {
    jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
      throw new Error('Unexpected error');
    });

    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'testuser@example.com',
        password: 'Password123'
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('errors');
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors).toContain('Unexpected error');
  });
});