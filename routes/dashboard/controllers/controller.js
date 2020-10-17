const router = require('express')();
const dbcontroller = require('../model/dbcontroller');
const verifyToken = require('../../../config/tokenAuth');

/* -------------- Errored task count ----------------*/  

router.get('/errored-tasks', async (req, res) => {
    try {
        let result = await dbcontroller.getErroredTasks();
        if(result) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send({error : 'try again later'});
        } 
    }
    catch(error) {
        return res.status(500).send({error : `server error ${error}`});
    }
})
/* -------------- Completed task count ----------------*/ 

router.get('/completed-tasks', verifyToken, async (req, res) => {
    try {
        let result = await dbcontroller.getCompletedTasks();
        if(result) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send({error : 'try again later'});
        } 
    }
    catch(error) {
        return res.status(500).send({error : `server error ${error}`});
    }
})

router.get('/get-task-counts', verifyToken, async (req,res) => {
     try {
        let result = await dbcontroller.getTasksCount();
        if(result) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send({error : 'try again later'});
        } 
    }
    catch(error) {
        return res.status(500).send({error : `server error ${error}`});
    }
})
module.exports = router;