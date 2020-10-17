let dbquery = require('./dbquery');
let pool = require('../../../config/constant');

try {
    pool.connect()
}
catch(err) {
    console.log('database connection error', err)
}

module.exports.getErroredTasks = async () => {
    try {
        let newdata = await pool.query(dbquery.getErroredTasks);
        return newdata.rows;
    }
    catch(e) {
        throw e
    }
}

module.exports.getCompletedTasks = async () => {
    try {
        let newdata = await pool.query(dbquery.getCompletedTasks);
        return newdata.rows;
    }
    catch(e) {
        throw e
    }
}

module.exports.getTasksCount = async () => {
    try {
        let newdata = await pool.query(dbquery.getTasksCount);
        return newdata.rows;
    }
    catch(e) {
        throw e
    }
}