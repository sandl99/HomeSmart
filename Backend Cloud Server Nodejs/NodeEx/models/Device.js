const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deviceSchema   = new Schema({
    _id: {
        type: Number
    },
    userID: {
        type: Number
    },
    type: {
        type: String
    },
    status: {
        type: Number
    }
}, {timestamps: false})

const Device = mongoose.model('Device', deviceSchema)
module.exports = Device