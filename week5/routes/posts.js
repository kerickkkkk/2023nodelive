const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController')

/* GET users listing. */
router.get('/posts', postsController.getPosts);
router.post('/post', postsController.postPosts);

module.exports = router;
