const request = require('supertest');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const app = require('../../../index');
const Product = require('../../../src/models/product');
const User = require('../../../src/models/User');

jest.mock('../../../src/models/product');

const mockToken = jwt.sign({ userId: '68101a7b665b17ab8ac6a8dc' }, process.env.JWT_SECRET || 'testSecret', {
    expiresIn: '1h',
});
const mockCookie = cookie.serialize('token', mockToken, { httpOnly: true });

beforeAll(async () => {
    await User.create({
        _id: '68101a7b665b17ab8ac6a8dc',
        email: 'test@example.com',
        password: 'password123',
        isVerified: true
    });
});

afterAll(async () => {
    await User.deleteMany();
});

describe('GET /api/products', () => {
    it('should return all products with a 200 status', async () => {
        const mockProducts = [
            { name: 'Product 1', price: 50, description: 'Description 1' },
            { name: 'Product 2', price: 100, description: 'Description 2' },
        ];

        Product.find.mockResolvedValue(mockProducts);

        const response = await request(app)
            .get('/api/products')
            .set('Cookie', mockCookie)
            .expect(200);

        expect(response.body.status).toBe('OK');
        expect(response.body.products).toEqual(mockProducts);
    });

    it('should return 500 if there is an error fetching products', async () => {
        Product.find.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .get('/api/products')
            .set('Cookie', mockCookie)
            .expect(500);

        expect(response.body.error).toBe('Database error');
    });
});