const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    _id: {
        type: Number
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
}, {timestamps: false})

const User = mongoose.model('User', userSchema)
module.exports = User
