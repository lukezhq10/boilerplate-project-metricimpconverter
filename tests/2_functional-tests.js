const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const URL = '/api/convert';

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('Test GET /api/convert', () => {
        test('Convert Valid Input', (done) => {
            chai
                .request(server)
                .get(URL)
                .query({ input: '10L' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.initNum, 10);
                    assert.equal(res.body.initUnit, 'L');
                    assert.approximately(res.body.returnNum, 2.64172, 0.1);
                    assert.equal(res.body.returnUnit, 'gal');
                    done();
                });
        });

        test('Convert Invalid Input (Unit)', (done) => {
            chai
                .request(server)
                .get(URL)
                .query({ input: '32g' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'invalid unit');
                    done();
                }); 
        });

        test('Convert Invalid Input (Number)', (done) => {
            chai
                .request(server)
                .get(URL)
                .query({ input: '3/7.2/4kg' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'invalid number');
                    done();
                }); 
        });

        test('Convert Invalid Input (Unit & Number)', (done) => {
            chai
                .request(server)
                .get(URL)
                .query({ input: '3/7.2/4kilomegagram' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'invalid number and unit');
                    done();
                }); 
        });

        test('Convert No Number Input', (done) => {
            chai
                .request(server)
                .get(URL)
                .query({ input: 'kg' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.initNum, 1);
                    assert.equal(res.body.initUnit, 'kg');
                    assert.approximately(res.body.returnNum, 2.20462, 0.1);
                    assert.equal(res.body.returnUnit, 'lbs');
                    done();
                }); 
        });
    })
});
