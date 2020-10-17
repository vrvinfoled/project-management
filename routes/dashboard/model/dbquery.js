module.exports.getErroredTasks = `select count(*) as total_errored from tbl_tasks 
where task_state='errored' and task_status='true'`;

module.exports.getCompletedTasks = `select count(*) as total_errored from tbl_tasks 
where task_state='completed' and task_status='true'`;

module.exports.getTasksCount = `select c.card_name,count(t.*) as count
from tbl_cards c 
left join tbl_tasks t on t.current_card = c.card_id or t.current_card is null 
and t.task_status=true
group by c.card_id`;