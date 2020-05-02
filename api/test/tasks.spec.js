process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const expect = chai.expect;
const mongoose = require("mongoose");
const TaskSchema = require('../database/schemas/TaskSchema')

const { tasks } = require('./mocks/tasks.js')
chai.use(chaiHttp);

describe('test tasks', ()=>{
  before(async () => {
    await TaskSchema.deleteMany({})
  });
  after(async () => {
    await TaskSchema.deleteMany({})
    mongoose.connection.close()
  });

  it('POST /tasks', (done)=>{
    chai.request(server)
      .post('/tasks')
      .send(tasks[1])
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  })

  it('GET /tasks', (done)=>{
    chai.request(server)
      .get('/tasks')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.a('Array');
        expect(res.body).to.have.lengthOf(1);
        done();
      });
  })

})
