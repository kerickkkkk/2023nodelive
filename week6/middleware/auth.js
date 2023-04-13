const jwt = require('jsonwebtoken');
const handleSuccess = require('../service/handleSuccess')
const appError = require('../service/appError')
const User = require('../models/userModel')
const isAuth = async (req, res, next) => {
    // 取得 JWT 
    let token = null;
    if( 
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next( appError(400, '沒有權限', next))
    }
    // 比對 jwt 是否正確
    const decode = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, payload)=>{
            if(err){
                reject(err)
            }else{
                resolve(payload)
            }
        })
    })
    // 取出使用者
    const currentUser = await User.findById(decode.id)
    if(!currentUser){
        return next( appError(400, '沒有使用者', next))
    }
    // 順帶使用者
    req.user = currentUser
    next()
}

const generateJWT= (user,res)=>{
    // // 產生 JWT token
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_DAY
    });

    user.password = undefined;
    handleSuccess(res, 
        {   message: '成功',
            user : {
                name: user.name,
                token
            }
        })
}

module.exports = {
    generateJWT,
    isAuth
};