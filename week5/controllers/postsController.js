const handleSuccess = require('../service/handleSuccess')
const handleError = require('../service/handleError')

const Post = require('../models/postModel')


const posts = {
    getPosts : async (req, res) => {
        try {
            // 篩選功能
            const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt"
            const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
            const posts = await Post.find(q)
              .populate({
                path: 'user',
                select:'name'
              }).sort(timeSort);
            handleSuccess(res, posts)
          } catch (error) {
            handleError(error, res)
          }
    },
    postPosts : async (req, res) => {
      try {
        const { content, user } = req.body
          const newPost = await Post.create({
            user,
            content
          })
          handleSuccess(res, newPost)
        } catch (error) {
          handleError(error, res)
        }
    }
}

module.exports = posts
