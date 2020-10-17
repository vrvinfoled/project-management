module.exports.addTasks = `insert into tbl_tasks (task_name, task_desc, 
    from_card, current_card, task_state, from_card_state, current_card_state,from_card_name) 
    values ($1,$2,$3,$4,$5,$6,$7,$8) returning task_id`;

module.exports.deleteTask = `update tbl_tasks 
    set task_status = false 
    where task_id=$1 
    returning task_id`;

module.exports.updateCurrentState = `update tbl_tasks 
    set current_card_state = $1 
    where task_id = $2 
    returning task_id`;

module.exports.getAlltasks = `select * from tbl_tasks 
    where task_status = true 
    order by task_id`;

module.exports.getTasksByCardId = `select * from tbl_tasks 
    where current_card = $1 
    and task_status = true 
    order by task_id`;

module.exports.moveTask = `update tbl_tasks 
    set task_state = $1, from_card = $2, 
    current_card = $3, from_card_state = $4, 
    current_card_state = $5, from_card_name = $7 
    where task_id = $6 returning task_id`;