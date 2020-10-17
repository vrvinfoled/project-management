'use strict';
 
const chai = require('chai');
const expect = require('chai').expect;

const server = require('../server')
chai.use(require('chai-http'));

const tokenHeader = {
    authorization : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI0NzQ5MzIsImV4cCI6MTYwMjU2MTMzMn0.2XQl9JkNzjjlHF76M4ifH9QkYYL10LWGJsYZwzy72vs"
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI0NzQ5MzIsImV4cCI6MTYwMjU2MTMzMn0.2XQl9JkNzjjlHF76M4ifH9QkYYL10LWGJsYZwzy72vs"

const deleteCard = {
    "data" : {
        "card_id" : 1
    }
}


describe('CARD RELATED TEST CASES', function() {
    describe('Cards related api (statuscode:200)', function() {
        it('Case-16 : Should get all cards', function() {
            chai.request(server)
            .get('/api/cards/get-cards')
            .set(tokenHeader)
            .then(function(resp) {
                expect(resp.status).to.be.deep.equal(200);
                expect(resp.body).to.have.deep.an('array')
            })
        })

        it.skip('Case-17 : Should delete cards (statuscode:200)', function() {
            chai.request(server)
            .put('/api/cards/delete-card')
            .set(tokenHeader)
            .send(deleteCard)
            .then(function(resp) {
                expect(resp.status).to.be.deep.equal(200);
                expect(resp.body).to.have.deep.an('array')
            })
        })
    })
});
 