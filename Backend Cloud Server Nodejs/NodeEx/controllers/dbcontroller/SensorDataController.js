const SensorData = require('../../models/SensorData')

// Show  the list of Sensors
const showAll = (req, res, next) => {
    SensorData.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(err => {
        res.json({
            error: 'An error occured!'
        })
    })
}

// show lastest SensorData by sensorID 
const showBySensorID = async (_sensorID) => {
    // console.log(_sensorID)
    // SensorData.findOne(
    //     {sensorID: _sensorID}, {},
    //     { sort: { 'createdAt' : -1} })
    // .then(response => {
    //     console.log("lOI")
    //     return response
    // })
    // .catch(error => {
    //     return null
    // })
    const response = await SensorData.findOne(
        {sensorID: _sensorID}, {},
        { sort: { 'createdAt' : -1} })
    // console.log(response)
    return response
}

// add new SensorData
const store = (req, res, next) => {
    let sensorData = new SensorData({
        sensorID: req.body.sensorID,
        value: req.body.value,
        createdAt: new Date(req.body.createdAt)
    })
    console.log(req.body.sensorID)
    sensorData.save()
    .then(response => {
        res.json({
            message: 'SensorData Added Successfully!' 
        })
    })
    .catch(error => {
        console.log(error)
        res.json({
            error: 'An error occured!'
        })
    })
}

module.exports = {
    showAll, showBySensorID, store
}
