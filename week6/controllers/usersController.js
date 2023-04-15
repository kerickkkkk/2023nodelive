const validator = require('validator');
const bcrypt = require('bcryptjs');
const handleSuccess = require('../service/handleSuccess')
const handleErrorAsync = require('../service/handleErrorAsync')
const appError = require('../service/appError')
const {generateJWT} = require('../middleware/auth')
const User = require('../models/userModel')


const users = {
    getUsers : handleErrorAsync(async  (req, res, next) => {
      const users = await User.find()
      handleSuccess(res, users)
    }),
    // 以 jwt 確認使用者並取得資料
    profile : handleErrorAsync(async  (req, res, next) => {
      handleSuccess(res, req.user)
    }),
    resetPassword : handleErrorAsync(async  (req, res, next) => {
      const { password, confirmPassword} = req.body
      if(!req.user){
        return next( appError(400, '沒有使用者或者沒有權限', next))
      }
      
      // 驗證 
      if( !password || !confirmPassword ) {
        return next( appError(400, '欄位不可為空', next))
      }

      if( password !== confirmPassword ) {
        return next( appError(400, '輸入密碼與確認密碼需相同', next))
      }

      if( !validator.isLength(password, {min:8})){
        return next( appError(400, '密碼長度需大於 8 碼', next))
      }
      
      const bcryptPassword = await bcrypt.hash( password, 12)
      const user = await User.findByIdAndUpdate(req.user, {
        password: bcryptPassword,
      })
      generateJWT( user, res)
    }),
    singUp : handleErrorAsync( async (req, res, next) => {
      const {name, email, password, confirmPassword} =req.body
      // 驗證 
      if( !name || !email || !password || !confirmPassword ) {
        return next( appError(400, '欄位不可為空', next))
      }

      if( password !== confirmPassword ) {
        return next( appError(400, '輸入密碼與確認密碼需相同', next))
      }

      if( !validator.isLength(password, {min:8})){
        return next( appError(400, '密碼長度需大於 8 碼', next))
      }

      if( !validator.isEmail(email)){
        return next( appError(400, 'email 格式有誤', next))
      }

      // 加密
      const bcryptPassword = await bcrypt.hash(password, 12)

      const newUser = await User.create({
        name, email, password: bcryptPassword, 
      })
      generateJWT( newUser, res)
    }),
    login : handleErrorAsync( async(req, res, next) => {
      const {email, password} = req.body
      // 驗證 
      if( !email || !password ) {
        return next( appError(400, '欄位不可為空', next))
      }

      if( !validator.isLength(password, {min:8})){
        return next( appError(400, '密碼長度需大於 8 碼', next))
      }

      if( !validator.isEmail(email)){
        return next( appError(400, 'email 格式有誤', next))
      }

      const user = await User.findOne({ email: email }).select('+password')
      const checkPassword = await bcrypt.compare(password, user.password)
      if(!checkPassword){
        return next( appError(400, '密碼錯誤', next))
      }else{
        generateJWT(user, res)
      }
    }),
    updateProfile : handleErrorAsync( async(req, res, next) => {
      const { name, photo, sex} = req.body
      console.log( { name, photo, sex} )
      // name 不得為空
      const params = {}
      if( !name ) {
        return next( appError(400, '欄位不可為空', next))
      }{
        params.name = name
      }
      // 允許空
      if(photo === "" || photo){
        params.photo = photo
      }
      if( sex === "" || sex ){
        params.sex = sex
      }
      const updateUser = await User.findByIdAndUpdate(req.user.id, params , {
        returnDocument: 'after'
      })
      
      handleSuccess(res, updateUser)
    })
}

module.exports = users
