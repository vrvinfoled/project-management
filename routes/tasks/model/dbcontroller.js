let dbquery = require('./dbquery');
let pool = require('../../../config/constant');

try {
    pool.connect()
}
catch(err) {
    console.log('database connection error', err)
}

module.exports.addTasks = async (postdata) => {
    try {
        let { 
            task_name, task_desc, 
            from_card, current_card, 
            task_state, from_card_state, 
            current_card_state,
            from_card_name 
        } = postdata;

        let params = [
            task_name, task_desc, 
            from_card, current_card, 
            task_state, from_card_state, 
            current_card_state,
            from_card_name
        ];

        let newdata = await pool.query(dbquery.addTasks, params);
        return newdata.rows;
    }
    catch(e) {
        throw e;
    }
}

module.exports.deleteTask = async (postdata) => {
    try {
        let {task_id} = postdata;
        let newdata = await pool.query(dbquery.deleteTask, [task_id]);
        return newdata.rows;
    }
    catch(e) {
        throw e;
    }
}

module.exports.updateCurrentState = async (postdata) => {
    try {
        let {task_id, state} = postdata;
        let newdata = await pool.query(dbquery.updateCurrentState, [state, task_id]);
        return newdata.rows;
    }
    catch(e) {
        throw e;
    }
}

module.exports.getAlltasks = async () => {
    try {
        let newdata = await pool.query(dbquery.getAlltasks);
        return newdata.rows;
    }
    catch(e) {
        throw e;
    }
}

module.exports.getTasksByCardId = async (card_id) => {
    try {
        let newdata = await pool.query(dbquery.getTasksByCardId,[card_id]);
        return newdata.rows;
    }
    catch(e) {
        throw e;
    }
}

module.exports.moveTask = async (postdata) => {
    try {
        let {task_state, from_card, current_card, 
            from_card_state, current_card_state, task_id, from_card_name} = postdata;
        let params = [task_state, from_card, current_card, 
            from_card_state, current_card_state, task_id, from_card_name];
        
        let newdata = await pool.query(dbquery.moveTask,params);
        return newdata.rows;
    }
    catch(e) {
        throw e;
    }
}