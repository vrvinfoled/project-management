'use strict';
 
const chai = require('chai');
const expect = require('chai').expect;

const server = require('../server')
chai.use(require('chai-http'));

const tokenHeader = {
    authorization : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI0NzQ5MzIsImV4cCI6MTYwMjU2MTMzMn0.2XQl9JkNzjjlHF76M4ifH9QkYYL10LWGJsYZwzy72vs"
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI0NzQ5MzIsImV4cCI6MTYwMjU2MTMzMn0.2XQl9JkNzjjlHF76M4ifH9QkYYL10LWGJsYZwzy72vs"

const taskdata = {
    "data" : {
        "task_name" : "task37", 
        "task_desc" : "task37", 
        "from_card" : 1, 
        "current_card" : 1, 
        "task_state" : "alltasks", 
        "from_card_state" : "unchecked", 
        "current_card_state" : "unchecked",
        "from_card_name" : "alltasks"
    }
}

const deleteTaskData = {
    "data" : {
        "task_id" : 37
    }
}

const updateStatusData = {
    "data" : {
        "task_id" : 37,
        "state" : "checked"
    }
}

const moveTaskData = {
    "data" : {
        "task_state" : "errored",
        "from_card" : 1,
        "current_card" : 2,
        "from_card_state" : "checked",
        "current_card_state" : "unchecked",
        "task_id" : 37,
        "from_card_name" : "alltasks"
    }
}

describe('TASK RELATED TEST CASES', function() {
    describe('Task related api', function() {
        it.skip('Case-18 : Should add new task (statuscode:200)', function() {
            chai.request(server)
            .post('/api/tasks/add-tasks')
            .set(tokenHeader)
            .send(taskdata)
            .then(function(resp) {
                expect(resp.status).to.be.deep.equal(200);
                expect(resp.body).to.have.deep.an('array');
            })
        })

        it('Case-19 : Should get error while add new task (statuscode:500)', function() {
            chai.request(server)
            .post('/api/tasks/add-tasks')
            .set(tokenHeader)
            .then(function(resp) {
                expect(resp.status).to.be.deep.equal(500);
                expect(resp.body).to.have.deep.an('object');
            })
        })

        it.skip('Case-20 : Should delete task (statuscode : 200)', function() {
            chai.request(server)
            .put('/api/tasks/delete-tasks')
            .set(tokenHeader)
            .send(deleteTaskData)
            .then(function(resp) {
                expect(resp.status).to.be.deep.equal(200);
                expect(resp.body).to.have.deep.an('array');
            })
        })

        it.skip('Case-21 : Should update task checkbox status (statuscode : 200)', function() {
            chai.request(server)
            .put('/api/tasks/update-current-state')
            .set(tokenHeader)
            .send(updateStatusData)
            .then(function(resp) {
                expect(resp.status).to.be.deep.equal(200);
                expect(resp.body).to.have.deep.an('array');
            })
        })

        it('Case-22 : Should get all tasks (statuscode : 200)', function() {
            chai.request(server)
            .get('/api/tasks/get-Tasks')
            .set(tokenHeader)
            .then(function(resp) {
                expect(resp.status).to.be.deep.equal(200);
                expect(resp.body).to.have.deep.an('array');
            })
        })

        it('Case-23 : Should get tasks by card id (statuscode : 200)', function() {
            chai.request(server)
            .get('/api/tasks/get-task-by-card-id')
            .set(tokenHeader)
            .query({card_id : 1})
            .then(function(resp) {
                expect(resp.status).to.be.deep.equal(200);
                expect(resp.body).to.have.deep.an('array');
            })
        })

        it.skip('Case-24 : Should move the task (statuscode : 200)', function() {
            chai.request(server)
            .post('/api/tasks/move-task')
            .set(tokenHeader)
            .send(moveTaskData)
            .then(function(resp) {
                expect(resp.status).to.be.deep.equal(200);
                expect(resp.body).to.have.deep.an('array');
            })
        })
    })
})