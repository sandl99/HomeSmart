const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sensorSchema = new Schema({
    _id: {
        type: Number
    },
    userID: {
        type: String
    },
    type: {
        type: String
    }
}, {timestamps: false})

const Sensor = mongoose.model('Sensor', sensorSchema)
module.exports = Sensor
