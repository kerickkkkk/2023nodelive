const handleSuccess = require('../service/handleSuccess')
const handleErrorAsync = require('../service/handleErrorAsync')

const User = require('../models/userModel')


const posts = {
    getUsers : handleErrorAsync(async  (req, res, next) => {
      const users = await User.find()
      handleSuccess(res, users)
    }),
    postUser : handleErrorAsync( async (req, res, next) => {
      const {name, email} =req.body
      const newUser = await User.create({
        name, email
      })
      handleSuccess(res, newUser)
    })
}

module.exports = posts
