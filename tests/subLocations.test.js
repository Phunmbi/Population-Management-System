import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app';
import dotenv from 'dotenv';

dotenv.config();

describe('Sub Locations API test', () => {
  it('should simulate POST request to create Location', (done) => {
    request(app)
      .post('/api/v1/locations')
      .send({
        location: "Jamaica",
        male_population: 100,
        female_population: 523
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done()
      })
  });

  it('should simulate POST request to create sub locations', (done) => {
    request(app)
      .post('/api/v1/sublocations/2')
      .send({
        sub_location: "Okota",
        male_population: 55,
        female_population: 523
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done()
      })
  });

  it('should simulate fail to POST request to create sub Location when location already exists', (done) => {
    request(app)
      .post('/api/v1/sublocations/1')
      .send({
        sub_location: "Okota",
        male_population: 55,
        female_population: 523
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done()
      })
  });

  it('should simulate fail to POST request to create sub Location when location does not exists', (done) => {
    request(app)
      .post('/api/v1/sublocations/50')
      .send({
        sub_location: "Okota",
        male_population: 55,
        female_population: 523
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done()
      })
  });

  it('should simulate fail to POST request to create sub Location when input is empty', (done) => {
    request(app)
      .post('/api/v1/sublocations/1')
      .send({
        sub_location: " ",
        male_population: 55,
        female_population: 523
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done()
      })
  });

  it('should simulate fail to POST request to create sub Location when input is not a string', (done) => {
    request(app)
      .post('/api/v1/sublocations/1')
      .send({
        sub_location: 34342,
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
      .post('/api/v1/sublocations/1')
      .send({
        location: "Okota",
        male_population: "55",
        female_population: 523
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done()
      })
  });

  it('should simulate PUT request to edit sub location', (done) => {
    request(app)
      .put('/api/v1/sublocations/1')
      .send({
        sub_location: "Okota",
        male_population: 443,
        female_population: 523
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done()
      })
  });

  it('should simulate fail PUT request to edit sub location when sub location does not exist', (done) => {
    request(app)
      .put('/api/v1/sublocations/500')
      .send({
        sub_location: "Maryland",
        male_population: 443,
        female_population: 523
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done()
      })
  });

  it('should simulate GET single location', (done) => {
    request(app)
      .get('/api/v1/sublocations/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.a('string');
        done()
      })
  });

  it('should simulate DELETE single sub location', (done) => {
    request(app)
      .delete('/api/v1/sublocations/2')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done()
      })
  });

  it('should fail to simulate DELETE single sub location when sub location does not exist', (done) => {
    request(app)
      .delete('/api/v1/sublocations/100')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done()
      })
  });
});

