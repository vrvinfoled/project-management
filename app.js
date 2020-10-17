let router = require('express')();

let userController = require('./routes/users/controllers/controller');
let cardController = require('./routes/cards/controllers/controller');
let taskController = require('./routes/tasks/controllers/controller');
let dashboardController = require('./routes/dashboard/controllers/controller');

router.use('/users', userController);
router.use('/cards', cardController);
router.use('/tasks', taskController);
router.use('/dashboard', dashboardController);

module.exports = router;