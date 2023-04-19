// 自定義 錯誤
import { NextFunction } from 'express';
// import {AppError} from '../types/AppError';

const appError = (
    httpCode:number, 
    errMessage:string, 
    next: NextFunction ): void => {
        const error :any = new Error(errMessage);
        error.statusCode = httpCode;
        error.isOperational = true;
        console.log(error)
        // 因為已經用延伸的就不用 new 了
        // 錯誤訊息會變成 [Object Object]
        // const error: AppError = {
        //     name: 'AppError',
        //     message: errMessage,
        //     statusCode: httpCode,
        //     isOperational: true,
        // };
    return next(error);
}

export default appError;