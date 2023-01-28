const express = require('express');
const router = express.Router();

const { login, register, logout } = require('../controllers/login');
const { createToDo, getAllTodos, deleteTask, editTask } = require('../controllers/todo');

// login routes
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);


// todo routes
router.route('/create').post(createToDo);
router.route('/getalltodos').post(getAllTodos);
router.route('/delete/:userId/:taskId').delete(deleteTask);
router.route('/edit/:userId/:task').patch(editTask);
module.exports = router;

