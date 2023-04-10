const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const userController = require('../controllers/usersController')
/* GET users listing. */
router.get('/users', userController.getUsers);
router.post('/user', userController.postUser);
router.post('/')
module.exports = router;
