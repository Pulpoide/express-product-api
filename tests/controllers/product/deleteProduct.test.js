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

  await Product.create({
    _id: '12345',
    nombre: 'Test Product',
    descripcion: 'A test product',
    precio: 100,
    marca: 'Test Brand',
    stock: 10,
    img: 'test.jpg',
  });
});

afterAll(async () => {
  await User.deleteMany();
  await Product.deleteMany();
});

describe('DELETE /api/products/:id', () => {
  it('should delete a product by ID with a 200 status', async () => {
    const mockProduct = {
      _id: '12345',
      nombre: 'Test Product',
      descripcion: 'A test product',
      precio: 100,
      marca: 'Test Brand',
      stock: 10,
      img: 'test.jpg',
    };

    Product.findByIdAndDelete.mockResolvedValue(mockProduct);

    const response = await request(app)
      .delete(`/api/products/${mockProduct._id}`)
      .set('Cookie', mockCookie)
      .expect(200);

    expect(response.body.status).toBe('OK');
    expect(response.body.message).toBe('Producto eliminado exitosamente');
  });

  it('should return 404 if the product is not found', async () => {
    Product.findByIdAndDelete.mockResolvedValue(null);

    const response = await request(app)
      .delete('/api/products/invalidId')
      .set('Cookie', mockCookie)
      .expect(404);

    expect(response.body.errors[0]).toBe('Producto no encontrado');
  });

  it('should return 500 if there is a server error', async () => {
    Product.findByIdAndDelete.mockRejectedValue(new Error('Error al eliminar el producto'));

    const response = await request(app)
      .delete('/api/products/12345')
      .set('Cookie', mockCookie)
      .expect(500);

    expect(response.body.errors[0]).toBe('Error al eliminar el producto');
  });
});
