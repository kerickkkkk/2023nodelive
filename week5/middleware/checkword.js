const appError = require('../service/appError')
const checkword = (req,res,next) => {
    console.log(next)
    if(req.query.q){
        next()
    }else{
        return next( appError(400, '您並未輸入關鍵字', next) )
    }
}

module.exports = checkword