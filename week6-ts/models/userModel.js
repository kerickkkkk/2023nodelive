const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '請輸入您的名字']
    },
    email: {
      type: String,
      required: [true, '請輸入您的 Email'],
      unique: true,
      lowercase: true,
      // select: false
    },
    photo:{
      type: String,
      default:''
    },
    sex: {
      type: String,
      enum:['male', 'female']
    },
    password: {
      type: String,
      required: [true, '請輸入密碼'],
      minlength: 8,
      select: false
    }
  },
  { versionKey: false }
);

const User = mongoose.model('User', userSchema);

module.exports = User;