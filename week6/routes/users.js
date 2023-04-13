const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const userController = require('../controllers/usersController')
const {isAuth} = require('../middleware/auth')
/* GET users listing. */
// 取得所有人員
router.get('/users', isAuth, userController.getUsers);
// 註冊
router.post('/user', userController.singUp);

// 確認是否有權限 並取得使用者資訊
router.get('/user/check', isAuth, userController.checkUser)

router.post('/user/reset_password', isAuth, userController.resetPassword)

router.post('/login', userController.login)

router.post('/')
module.exports = router;
