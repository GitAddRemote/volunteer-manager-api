// Set environment to test
process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHTTP = require('chai-http');
let app = require('../src/index');
let should = chai.should();

chai.use(chaiHTTP);

describe('Volunteers', () => {
    beforeEach((done) => { // delete all
        done();
    });

    let testVolunteerId;

    describe('/GET Volunteers', () => {
        it('should GET all the volunteers', (done) => {
            chai.request(app)
            .get('/volunteer')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.list.should.be.a('array');
                done();
            });
        });
    });

    describe('/POST Volunteer', () => {
        it('should Add a new volunteer', (done) => {

            const volunteer = {
                volunteer: {
                    username: 'dsmith',
                    firstName: 'Dave',
                    lastName: 'Smith',
                    role:{
                        id: '4ZNqfxzbjIS3uEkouFxE',
                        roleName: 'Project Manager'
                    }
                }
            };

            chai.request(app)
            .post('/volunteer')
            .send(volunteer)
            .end((err, res) => {
                testVolunteerId = res.body.id;
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('firstName').eql('Dave');
                res.body.should.have.property('lastName').eql('Smith');
                res.body.should.have.property('role').should.be.a('object');
                done();
            });
        });
    }); 
    
    /*
    * Test the /GET/:id route
    */
    describe('/GET/:id Volunteer', () => {
        it('it should GET a volunteer by the given id', (done) => {
            chai.request(app)
            .get('/volunteer/' + testVolunteerId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('firstName').eql('Dave');
                res.body.should.have.property('lastName').eql('Smith');
                res.body.should.have.property('role').should.be.a('object');
                done();
            });
        });
    });

    describe('/PATCH/:id Volunteer', () => {
        it('should Update an existing volunteer', (done) => {

            const volunteer = {
                volunteer: {
                    lastName: 'Fuller',
                }
            };

            chai.request(app)
            .patch('/volunteer/' + testVolunteerId)
            .send(volunteer)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('firstName').eql('Dave');
                res.body.should.have.property('lastName').eql('Fuller');
                res.body.should.have.property('role').should.be.a('object');
                done();
            });
        });
    }); 

    describe('/DELETE/:id Volunteer', () => {
        it('should delete an existing volunteer', (done) => {

            chai.request(app)
            .delete('/volunteer/' + testVolunteerId)
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
        });
    }); 


});

