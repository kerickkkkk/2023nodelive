const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// const DB = process.env.DATABASE.replace(
//   '<password>',
//   process.env.DATABASE_PASSWORD
// );
// 注意 使用 localhost 會連不到 目前看版本 up node 17up 要改成 127.0.0.1
const DB = 'mongodb://127.0.0.1:27017/post'
mongoose
  .connect(DB)
  .then(() => console.log('資料庫連線成功'))
  .catch((err) => console.log('資料庫連線失敗', err));