const handleSuccess = require('../service/handleSuccess')
const handleError = require('../service/handleError')

const User = require('../models/userModel')


const posts = {
    getUsers : async  (req, res, next) => {
      try {
        const users = await User.find()
        handleSuccess(res, users)
      } catch (error) {
        handleError(error, res)
      }
    },
    postUser : async (req, res, next) => {
      try {
        const {name, email} =req.body
        const newUser = await User.create({
          name, email
        })
      
        handleSuccess(res, newUser)
    
      } catch (error) {
        handleError(error, res)
      }
    }
}

module.exports = posts
