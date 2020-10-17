const router = require('express')();
const dbcontroller = require('../model/dbcontroller');
const verifyToken = require('../../../config/tokenAuth');

/* ---------------- Add tasks ----------------- */

router.post('/add-tasks', verifyToken, async (req, res) => {
    try {
        let {data} = req.body;
        let result = await dbcontroller.addTasks(data);
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

/* ---------------- Delete tasks ----------------- */

router.put('/delete-tasks', verifyToken, async (req, res) => {
    try {
        let {data} = req.body;
        let result = await dbcontroller.deleteTask(data);
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

/* ---------------- Update checkbox state in the tasks ----------------- */

router.put('/update-current-state', verifyToken,  async (req, res) => {
    try {
        let {data} = req.body;
        let result = await dbcontroller.updateCurrentState(data);
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

/* ---------------- Get all tasks ----------------- */

router.get('/get-tasks', verifyToken, async (req, res) => {
    try {
        let result = await dbcontroller.getAlltasks();
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

/* ---------------- get tasks by card id ----------------- */

router.get('/get-task-by-card-id', verifyToken, async (req, res) => {
    try {
        let {card_id} = req.query;
        let result = await dbcontroller.getTasksByCardId(card_id);
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

/* ---------------- Move task from one card to another card ----------------- */

router.post('/move-task', verifyToken, async (req, res) => {
    try {
        let {data} = req.body;
        let result = await dbcontroller.moveTask(data);
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

