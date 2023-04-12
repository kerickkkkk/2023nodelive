const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController')
const checkword = require('../middleware/checkword')

/* GET users listing. */
router.get('/posts', checkword, postsController.getPosts);
router.post('/post', postsController.postPosts);

module.exports = router;
