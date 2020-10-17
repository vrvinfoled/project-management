/* 
-------- * ---------
    Developed by Kiran Kumar K V
    Start date : 6th October 2020
    End date : 9th October 2020 
-------- * ---------
 */

let express = require('express');
let logger = require('morgan');
let bodyParser = require('body-parser');
let cron = require('node-cron');
let api = require('./app.js');
let crondb = require('./config/crondb.js');
let cors = require('cors');
let server = express();
let PORT = 5000;

server.use(logger(server.get("env") === "production" ? "combined" : "dev"));
server.use(bodyParser.urlencoded({ extended : false, limit :'500MB' }));
server.use(bodyParser.json());
server.use(cors());

server.use('/api', api);

server.listen(5000, () => {
    console.log("server is listening on port --- :",PORT);
    startCron();
})

startCron = () => {
    cron.schedule("* * * * * * ", async function() {
        crondb.expireOtp();
    }); 
}

module.exports = server;