const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../src/app');
const auth = require('../src/middleware/auth');

const { expect } = chai;
chai.use(chaiHttp);

describe('Dashboard API', () => {
  let authStub;

  beforeEach(() => {
    // Create a stub for the auth middleware that calls next() to allow the request to proceed
    authStub = sinon.stub(auth, 'authenticate').callsFake((req, res, next) => {
      // Add a mock user to the request
      req.user = { id: 1, rol: 'admin' };
      next();
    });
  });

  afterEach(() => {
    // Restore the original auth middleware after each test
    authStub.restore();
  });

  describe('GET /api/dashboard/summary', () => {
    it('should return dashboard summary data', (done) => {
      chai.request(app)
        .get('/api/dashboard/summary')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('salesSummary');
          expect(res.body.data).to.have.property('inventory');
          expect(res.body.data).to.have.property('cashRegister');
          expect(res.body.data).to.have.property('recentActivity');
          done();
        });
    });
  });

  describe('GET /api/dashboard/top-products', () => {
    it('should return top products data', (done) => {
      chai.request(app)
        .get('/api/dashboard/top-products')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/dashboard/sales-by-period', () => {
    it('should return sales by period data', (done) => {
      chai.request(app)
        .get('/api/dashboard/sales-by-period')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('labels');
          expect(res.body.data).to.have.property('datasets');
          done();
        });
    });
  });
});
