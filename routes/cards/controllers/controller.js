const router = require('express')();
const dbcontroller = require('../model/dbcontroller');
const verifyToken = require('../../../config/tokenAuth');

/* ------------------- Get all cards --------------------- */

router.get('/get-cards', verifyToken, async (req, res) => {
    try {
        let result = await dbcontroller.getAllCards();
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

/* ------------------- delete all card --------------------- */

router.put('/delete-card', verifyToken, async (req, res) => {
    try{
        let {data} = req.body;
        let result = await dbcontroller.deleteCard(data);
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

