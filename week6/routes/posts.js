const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController')
// 確認文字抽出 目前還不會的用到暫存
// const checkword = require('../middleware/checkword')
const {isAuth} = require('../middleware/auth')

/* GET users listing. */
router.get('/posts', isAuth, postsController.getPosts);
router.post('/posts', isAuth, postsController.postPosts);
router.patch('/posts/:id', isAuth, postsController.updatePost);
router.delete('/posts/:id', isAuth, postsController.deletePost);

module.exports = router;
