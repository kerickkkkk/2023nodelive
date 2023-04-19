import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs'
import validator from 'validator'
import handleErrorAsync from '../service/handleErrorAsync'
import appError  from '../service/appError';
import {User} from '../models/userModel'
import { generateJWT } from '../middleware/auth'
import handleSuccess  from '../service/handleSuccess'

export const users = {
  getUsers : handleErrorAsync( async(req:Request, res:Response,) => {
    const users = await User.find()
    handleSuccess(res, users)
  }),
  signUp : handleErrorAsync( async (req: Request, res : Response, next : NextFunction) => {    
    const {name, phone, password, confirmPassword} = req.body
    
    // 驗證 
    if( !name || !phone || !password || !confirmPassword ) {
      return next( appError(400, '欄位不可為空', next))
    }

    if( password !== confirmPassword ) {
      return next( appError(400, '輸入密碼與確認密碼需相同', next))
    }

    if( !validator.isLength(password, {min:8})){
      return next( appError(400, '密碼長度需大於 8 碼', next))
    }

    if( !validator.isLength(phone, {min:8})){
      return next( appError(400, '電話長度需大於 8 碼', next))
    }
    
    const hasSamePhone = await User.findOne({phone})
    if(hasSamePhone !== null) {
      return next( appError(400, '電話重複', next))
    }

    // 加密
    const bcryptPassword = await bcrypt.hash(password, 12)

    const newUser = await User.create({
      name, phone, password: bcryptPassword, 
    })
  
    generateJWT( newUser, res)
  }),
}

export default users