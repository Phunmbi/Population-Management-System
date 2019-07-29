import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app';
import dotenv from 'dotenv';

dotenv.config();

describe('Locations API test', () => {
  it('should simulate POST request to create Location', (done) => {
    request(app)
      .post('/api/v1/locations')
      .send({
        location: "Greg",
        male_population: 55,
        female_population: 523
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done()
      })
  });

  it('should simulate fail to POST request to create Location when location already exists', (done) => {
    request(app)
      .post('/api/v1/locations')
      .send({
        location: "Greg",
        male_population: 55,
        female_population: 523
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done()
      })
  });

  it('should simulate fail to POST request to create Location when input is empty', (done) => {
    request(app)
      .post('/api/v1/locations')
      .send({
        location: " ",
        male_population: 55,
        female_population: 523
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done()
      })
  });

  it('should simulate fail to POST request to create Location when input is not a string', (done) => {
    request(app)
      .post('/api/v1/locations')
      .send({
        location: 34342,
        male_population: 55,
        female_population: 523
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done()
      })
  });

  it('should simulate fail to POST request to create Location when input is not a number', (done) => {
    request(app)
      .post('/api/v1/locations')
      .send({
        location: 34342,
        male_population: "55",
        female_population: 523
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done()
      })
  });

  it('should simulate PUT request to edit location', (done) => {
    request(app)
      .put('/api/v1/locations/1')
      .send({
        location: "Greg",
        male_population: 443,
        female_population: 523
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.updatedLocation.total_population).to.be.equal(966);
        done()
      })
  });

  it('should simulate fail PUT request to edit location when location does not exist', (done) => {
    request(app)
      .put('/api/v1/locations/5')
      .send({
        location: "Greg",
        male_population: 443,
        female_population: 523
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done()
      })
  });

  it('should simulate fail to PUT request to edit location when id is bad', (done) => {
    request(app)
      .put('/api/v1/locations/p')
      .send({
        location: "Greg",
        male_population: 443,
        female_population: 523
      })
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done()
      })
  });

  it('should simulate to GET all locations', (done) => {
    request(app)
      .get('/api/v1/locations')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done()
      })
  });

  it('should simulate GET single location', (done) => {
    request(app)
      .get('/api/v1/locations/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.a('string');
        done()
      })
  });

  it('should simulate DELETE single location', (done) => {
    request(app)
      .delete('/api/v1/locations/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done()
      })
  });

  it('should fail to simulate DELETE single location when location does not exist', (done) => {
    request(app)
      .delete('/api/v1/locations/100')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done()
      })
  });
});

