const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', function(req, res) {
    res.status(200).json({ name: 'john' });
});
it('wtever', async () => {
    return await request(app)
        .get('/user')
        .expect('Content-Type', /json/)
        .expect('Content-Length', '15')
        .expect(200)
        .then(function(err, res) {

        });
})
