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
      const { id } = req.user
      // 自定義錯誤
      if( !req.body.content ){
        return next( appError(400, 'content 未填', next) )
      }
      const { content } = req.body
        const newPost = await Post.create({
          user : id,
          content 
        })
        handleSuccess(res, newPost)
    }),
    updatePost : handleErrorAsync(async (req, res, next) => {
      const {id: postId} = req.params

      if( !postId ){
        return next( appError(400, '文章 ID 錯誤', next) )
      }
      const {content} = req.body
      const currentPost = await Post.findById(postId).populate({
        path: 'user',
        select:'id'
      })
      if( !currentPost ){
        return next( appError(400, '找不到文章', next) )
      }
      if(req.user.id !== currentPost.user.id){
        return next( appError(400, '沒有權限修改文章', next) )
      }
      await currentPost.updateOne({_id: postId, content})
      // const updatedPost = await Post.findById(postId);
      handleSuccess(res, {
        message: "已更新"
      })
    }),
    deletePost : handleErrorAsync(async (req, res, next) => {
      const {id: postId} = req.params
      if( !postId ){
        return next( appError(400, '文章 ID 錯誤', next) )
      }
      const currentPost = await Post.findById(postId).populate({
        path: 'user',
        select:'id'
      })
      console.log(currentPost)

      if(req.user.id !== currentPost.user.id){
        return next( appError(400, '沒有權限修改文章', next) )
      }
      // remove不行
      await currentPost.deleteOne()
      handleSuccess(res, {
        message: `已刪除 post : ${currentPost.id}`
      })

    })
}

module.exports = posts
