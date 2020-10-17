const router = require('express')();
const dbcontroller = require('../model/dbcontroller');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const verifyToken = require('../../../config/tokenAuth');
const nodemailer = require('nodemailer');

/* ---------------- Register Users ----------------- */

router.post('/register', async (req, res) => {
    try {
        let {data} = req.body;
        let result = await dbcontroller.registerUser(data);
        if(result) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send({error : 'try again later'});
        }
    }
    catch(error) {
        res.status(500).send({'error' : `internal server error : ${error}`})
    }
})

/* ---------------- Login with email and password ----------------- */

/* ----------------
    If login success token will be generated.
    Token will be experired in 24 hours.
----------------- */

router.post('/get-login', async (req, res) => {
    try {
        let postdata = req.body.data;
        let {email,password} = postdata;
        let newdata = await dbcontroller.getLoginData(email);
        if(newdata.length > 0){
            if(newdata[0].user_email === email && newdata[0].user_password === password){
                var token = jwt.sign({ id : newdata[0].email}, config.secret, {
                    expiresIn : 86400 // expires in 24 hours
                });
                let responsedata = {
                    token : token,
                    username : newdata[0].user_name,
                    role : newdata[0].role_name,
                    user_id :newdata[0].user_id,
                    role_id : newdata[0].role_id,
                }
                return res.status(200).send(responsedata);
            }
            else {
                return res.status(400).send({error : 'username and password mis-match'})
            }
        }
        else { 
            return res.status(404).send({error :'user not found'});
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error ${e}`});
    }
})

/* ---------------- 
    Here otp will be generated and otp will be send to email.
    Otp will be valide for 15min. 
----------------- */

router.post('/forget-password', async (req, res) => {
    try {
        let {email} = req.body.data;
        let emailcheck  = await dbcontroller.checkForEmailValidity(email);
        if(emailcheck.length > 0) {
            let user_id = emailcheck[0].user_id;
            let otp = await generateOTP();
            let validity = await dbcontroller.checkOtpValidity(otp,user_id);
            if(validity) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'vrvinfoled@gmail.com',
                        pass: 'Vrvinfoled001@@@'
                    }
                });

                let link = 'http://localhost/resetpasswork';
                 var mailOptions = {
                    from: 'vrvinfoled@gmail.com',
                    to: email,
                    subject: 'Sending Email using Node.js',
                    text: `${otp} is your one time password to reset your password, and your link is ${link}`
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        return res.status(200).send({message : 'reset password link sent to the mail'})
                    }
                });
            }
        }
        else {
            return res.status(400).send({error : 'email does not exists'})
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error ${e}`})
    }
})

/* -------------------
    Here otp validation will be checked.
 --------------------*/
router.post('/checkOtpSessionValidity', async (req, res) => {
    try{
        let {data} = req.body;
        let result = await dbcontroller.checkOtpSession(data);
        if(result) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send({error : 'try again later'});
        }
    }
    catch(error) {
        res.status(500).send({'error' : `internal server error : ${error}`});
    }
})

/* ----------------
    If otp validation is success then this api will can to reset the password.
 ----------------*/

router.post('/reset-password', async (req, res) => {
    try{
        let {data} = req.body;
        let result = await dbcontroller.resetPassword(data);
        if(result) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send({error : 'try again later'});
        }
    }
    catch(error) {
        res.status(500).send({'error' : `internal server error : ${error}`});
    }
})

/* ---------------- Get all users ----------------- */

router.get('/get-users', verifyToken, async (req, res) => {
    try {
        let result = await dbcontroller.getAllUsers();
        if(result) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send({error : 'try again later'});
        }
    }
    catch(error) {
        res.status(500).send({'error' : `internal server error : ${error}`});
    }
})

/* ---------------- Delete user ----------------- */

router.put('/delete-user', verifyToken, async (req, res) => {
    try {
        let {data} = req.body;
        let result = await dbcontroller.deleteUser(data);
        if(result) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send({error : 'try again later'});
        }
    }
    catch(error) {
        console.log(error)
        res.status(500).send({'error' : `internal server error : ${error}`});
    }
})

module.exports = router;


generateOTP = () => { 
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
} 