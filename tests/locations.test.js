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

  // it('should simulate fail to POST request to add message when an input is empty', (done) => {
  //   request(app)
  //     .post('/api/v1/messages/create')
  //     .set('Authorization', token)
  //     .send({
  //       senderId: " ",
  //       receiverId: "080909090",
  //       message: "Old message",
  //     })
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400);
  //       done()
  //     })
  // });
  //
  // it('should simulate fail to POST request to add message when a sender does not exist', (done) => {
  //   request(app)
  //     .post('/api/v1/messages/create')
  //     .set('Authorization', token)
  //     .send({
  //       senderId: "88",
  //       receiverId: "080909090",
  //       message: "Old message",
  //     })
  //     .end((err, res) => {
  //       expect(res.status).to.equal(401);
  //       done()
  //     })
  // });
  //
  // it('should simulate fail to POST request to add message when a receiver does not exist', (done) => {
  //   request(app)
  //     .post('/api/v1/messages/create')
  //     .set('Authorization', token)
  //     .send({
  //       senderId: "00009",
  //       receiverId: "080909090",
  //       message: "Old message",
  //     })
  //     .end((err, res) => {
  //       expect(res.status).to.equal(401);
  //       done()
  //     })
  // });
  //
  // it('should simulate fail to POST request to add message when an input is not a string', (done) => {
  //   request(app)
  //     .post('/api/v1/messages/create')
  //     .set('Authorization', token)
  //     .send({
  //       senderId: 4387,
  //       receiverId: "080909090",
  //       message: "Old message",
  //     })
  //     .end((err, res) => {
  //       expect(res.status).to.equal(400);
  //       done()
  //     })
  // });
  //
  // it('should simulate GET all messages', (done) => {
  //   request(app)
  //     .get('/api/v1/messages')
  //     .set('Authorization', token)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(200);
  //       expect(res.body.message).to.be.a('string');
  //       done()
  //     })
  // });
  //
  // it('should simulate GET single message', (done) => {
  //   request(app)
  //     .get('/api/v1/messages/1')
  //     .set('Authorization', token)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(200);
  //       done()
  //     })
  // });
  //
  // it('should simulate fail to GET contact when message does not exist', (done) => {
  //   request(app)
  //     .get('/api/v1/messages/64732')
  //     .set('Authorization', token)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(404);
  //       done()
  //     })
  // });
  //
  // it('should simulate to DELETE message', (done) => {
  //   request(app)
  //     .delete('/api/v1/messages/1')
  //     .set('Authorization', token)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(200);
  //       done()
  //     })
  // });
  //
  // it('should simulate to fail to DELETE message when message does not exist', (done) => {
  //   request(app)
  //     .delete('/api/v1/messages/1')
  //     .set('Authorization', token)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(404);
  //       done()
  //     })
  // });
});

