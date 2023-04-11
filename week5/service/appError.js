// 自定義 錯誤
/* 使用方式
    if( req.body.content ){
        return next( appError(400, 'content 未填', next) )
    }
*/
const appError = (httpCode, errMessage, next)=>{
    const error = new Error(errMessage);
    error.statusCode = httpCode;
    error.isOperational = true;
    next(error);
}

module.exports = appError;