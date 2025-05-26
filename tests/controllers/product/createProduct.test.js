const request = require('supertest');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const app = require('../../../index');
const Product = require('../../../src/models/product');
const User = require('../../../src/models/User');

jest.mock('../../../src/models/product');

const mockToken = jwt.sign(
  { userId: '68101a7b665b17ab8ac6a8dc' },
  process.env.JWT_SECRET || 'testSecret',
  {
    expiresIn: '1h',
  }
);
const mockCookie = cookie.serialize('token', mockToken, { httpOnly: true });

beforeAll(async () => {
  await User.create({
    _id: '68101a7b665b17ab8ac6a8dc',
    email: 'test@example.com',
    password: 'password123',
    isVerified: true,
  });
});

afterAll(async () => {
  await User.deleteMany();
});

describe('POST /api/products', () => {
  it('should create a new product and return 201 status', async () => {
    const mockProduct = {
      name: 'Test Product',
      price: 100,
      description: 'A test product',
    };

    Product.create.mockResolvedValue(mockProduct);

    const response = await request(app)
      .post('/api/products')
      .set('Cookie', mockCookie)
      .send(mockProduct)
      .expect(201);

    expect(response.body.status).toBe('OK');
    expect(response.body.message).toBe('Producto creado exitosamente');
    expect(response.body.product).toEqual(mockProduct);
  });

  it('should return 500 if there is an error during creation', async () => {
    Product.create.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/api/products')
      .set('Cookie', mockCookie)
      .send({ name: 'Invalid Product' })
      .expect(500);

    expect(response.body.errors).toContain('Error al crear el producto');
  });
});
