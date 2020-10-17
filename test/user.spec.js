'use strict';
 
const chai = require('chai');
const expect = require('chai').expect;

const server = require('../server')
chai.use(require('chai-http'));

const registerData = {
    data : {
        "user_name" : "kumarbhatkv",
        "user_email" : "kumarbhatkv@gmail.com",
        "user_password" : "kumarbhatkv123212"
    }
}

const loginData = {
    "data" : {
        "email" : "kiranbhatkv@gmail.com",
        "password" : "kiranbhat12341"
    }
}

const loginData1 = {
    "data" : {
        "email" : "kiranbhat@gmail.com",
        "password" : "kiranbhat12341"
    }
}

const loginData2 = {
    "data" : {
        "email" : "kiranbhatkv@gmail.com",
        "password" : "kiranbhat12345"
    }
}

const forgetPasswordData = {
    "data" : {
        "email" : "kiranbhatkv@gmail.com"
    }
}

const forgetPasswordData1 = {
    "data" : {
        "email" : "kiranbhat@gmail.com"
    }
}

const otpValidityData = {
    "data" : {
        "otp" : 199476
    }
}

const resetPasswordData = {
    "data" : {
        "user_id" : 14,
        "user_password" : "kumarbhatkv12321212"
    }
}

const tokenHeader = {
    authorization : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI0NzQ5MzIsImV4cCI6MTYwMjU2MTMzMn0.2XQl9JkNzjjlHF76M4ifH9QkYYL10LWGJsYZwzy72vs"
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI0NzQ5MzIsImV4cCI6MTYwMjU2MTMzMn0.2XQl9JkNzjjlHF76M4ifH9QkYYL10LWGJsYZwzy72vs"

const deleteUser = {
    "data" : {
        "user_id" : 14
    }
}

describe('USER RELATED TEST CASES', function() {
    describe('User related apis', function() {
        it.skip('Case-1 : Should register new user (statuscode:200)', function() { 
            chai.request(server)
            .post('/api/users/register')
            .send(registerData)
            .then(function(resp){
                expect(resp.status).to.be.deep.equal(200);
                expect(resp.body[0]).to.have.deep.property('user_id');
            })
        })

        it.skip('Case-2 : Should get error while register new user (statuscode:500)', function() { 
            chai.request(server)
            .post('/api/users/register')
            .send(registerData)
            .then(function(resp){
                expect(resp.status).to.be.deep.equal(500);
                expect(resp.body).to.have.deep.property('error');
            })
        })

        it('Case-3 : Should login user (statuscode:200)', function() {
            chai.request(server)
            .post('/api/users/get-login')
            .send(loginData)
            .then(function(resp){
                expect(resp.status).to.be.deep.equal(200);
                expect(resp.body).to.have.deep.property('token');
            })
        })

        it('Case-4 : Should get error while login user (statuscode:404)', function() {
            chai.request(server)
            .post('/api/users/get-login')
            .send(loginData1)
            .then(function(resp){
                expect(resp.status).to.be.deep.equal(404);
                expect(resp.body).to.have.deep.property('error',"user not found");
            })
        })

        it('Case-5 : Should get error while login user (statuscode:400)', function() {
            chai.request(server)
            .post('/api/users/get-login')
            .send(loginData2)
            .then(function(resp){
                expect(resp.status).to.be.deep.equal(400);
                expect(resp.body).to.have.deep.property('error',"username and password mis-match");
            })
        })

        it('Case-6 : Should get error while login user (statuscode:500)', function() {
            chai.request(server)
            .post('/api/users/get-login')
            .then(function(resp){
                expect(resp.status).to.be.deep.equal(500);
                expect(resp.body).to.have.deep.property('error');
            })
        })

        it.skip('Case-7 : Should get forget login email link (statuscode:200)', function() {
            chai.request(server)
            .post('/api/users/forget-password')
            .send(forgetPasswordData)
            .then(function(resp){
                // console.log(resp)
                expect(resp.status).to.be.deep.equal(200);
                expect(resp.body).to.have.deep.property('message');
            })
        })

        it('Case-8 : Should get error while forget login email link (statuscode:400)', function() {
            chai.request(server)
            .post('/api/users/forget-password')
            .send(forgetPasswordData1)
            .then(function(resp){
                expect(resp.status).to.be.deep.equal(400);
                expect(resp.body).to.have.deep.property('error',"email does not exists");
            })
        })

        it('Case-9 : Should get error while forget login email link (statuscode:500)', function() {
            chai.request(server)
            .post('/api/users/forget-password')
            .then(function(resp){
                expect(resp.status).to.be.deep.equal(500);
                expect(resp.body).to.have.deep.property('error');
            })
        })

        it('Case-10 : Should check otp validity (statuscode:500)', function() {
            chai.request(server)
            .post('/api/users/checkOtpSessionValidity')
            .then(function(resp){
                expect(resp.status).to.be.deep.equal(500);
                expect(resp.body).to.have.deep.property('error');
            })
        })

        it.skip('Case-11 : Should check otp validity (statuscode:200)', function() {
            chai.request(server)
            .post('/api/users/checkOtpSessionValidity')
            .send(otpValidityData)
            .then(function(resp){
                expect(resp.status).to.be.deep.equal(200);
                expect(resp.body).to.have.deep.an('array')
            })
        })

        it.skip('Case-12 : Should reset password (statuscode:200)', function() {
            chai.request(server)
            .post('/api/users/reset-password')
            .send(resetPasswordData)
            .then(function(resp){
                // console.log(resp)
                expect(resp.status).to.be.deep.equal(200);
                expect(resp.body).to.have.deep.an('array')
            })
        })

        it('Case-13 : Should get all the users (statuscode:200)', function() {
            chai.request(server)
            .get('/api/users/get-users')
            .set(tokenHeader)
            .then(function(resp){
                expect(resp.status).to.be.deep.equal(200);
                expect(resp.body).to.have.deep.an('array')
            })
        })

        it('Case-14 : Should get error while fetch users (statuscode:401)', function() {
            chai.request(server)
            .get('/api/users/get-users')
            // .set(tokenHeader)
            .then(function(resp){
                expect(resp.status).to.be.deep.equal(401);
                expect(resp.body).to.have.deep.an('object')
            })
        })

        it('Case-15 : Should delete users (statuscode:200)', function() {
            chai.request(server)
            .put('/api/users/delete-user')
            .set(tokenHeader)
            .send(deleteUser)
            .then(function(resp){
                // console.log(resp)
                expect(resp.status).to.be.deep.equal(200);
                expect(resp.body[0]).to.have.deep.property('user_id');
            })
        })
    })
})