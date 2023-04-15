const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const userController = require('../controllers/usersController')
const {isAuth} = require('../middleware/auth')
/* GET users listing. */
// 取得所有人員 無驗證
router.get('/users', userController.getUsers);
// 註冊
router.post('/users/sign_up', userController.singUp);
router.post('/login', userController.login)
// 重置密碼
router.post('/users/reset_password', isAuth, userController.resetPassword)
// 確認是否有權限 並取得使用者資訊
router.get('/users/profile', isAuth, userController.profile)
router.patch('/users/profile', isAuth, userController.updateProfile)



router.post('/')
module.exports = router;
