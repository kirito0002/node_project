//用户登录的信息
//第一步：定义数据库的字段
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    identity: {
        type: Number,
        require:true
    }
})
//数据集合
module.exports = mongoose.model("user", userSchema)
//对应app数据库里面的 users 集合