const handleSuccess = require('../service/handleSuccess')
const appError = require('../service/appError')
const handleErrorAsync = require('../service/handleErrorAsync')
const Post = require('../models/postModel')



const posts = {
    getPosts : handleErrorAsync( async (req, res, next) => {
      // 篩選功能
      const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt"
      const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
      const posts = await Post.find(q)
        .populate({
          path: 'user',
          select:'name'
        }).sort(timeSort);
      handleSuccess(res, posts)
    }),
    postPosts : handleErrorAsync(async (req, res, next) => {
      // 自定義錯誤
      if( !req.body.content ){
        return next( appError(400, 'content 未填', next) )
      }
      const { content, user } = req.body
        const newPost = await Post.create({
          user,
          content
        })
        handleSuccess(res, newPost)
    })
}

module.exports = posts
