const request = require('supertest');
const express = require('express');
const router = require('./routes/films');
const Film = require('./models/films');

const app = express();
app.use(express.json());
app.use(router);

jest.mock('./models/films'); 

describe('GET /:filmId/film', () => {
    it('should return a film when it exists', async () => {
        const testFilm = { tmdbId: 123, likes: [], comments: [] };
        Film.findOne.mockResolvedValue(testFilm); // Correction ici

        const res = await request(app).get('/123/film');

        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe(true);
        expect(res.body.film).toEqual(testFilm);
    });
});