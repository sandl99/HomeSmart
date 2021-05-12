const Sensor = require('../../models/Sensor')

// Show  the list of Sensors
const showAll = (req, res, next) => {
    Sensor.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(err => {
        res.json({
            message: 'An error occured!'
        })
    })
}

// show single Sensor
const showByID = (req, res, next) => {
    let _id = req.query._id
    Sensor.findById(_id)
    .then(sensor => {
        res.locals.sensor = sensor
        next()
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}


// show Sensor by userID
const showByUserID = (req, res, next) => {
    Sensor.find({userID: req.query.userID})
    .then(sensor => {
        res.locals.sensor = sensor
        next()
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}


// add new Sensor
const store = (req, res, next) => {
    let sensor = new Sensor({
        _id: req.body._id,
        userID: req.body.userID,
        type: req.body.type,
        createdAt: new Date(req.body.timestamp)
    })

    sensor.save()
    .then(response => {
        res.status(200).json({
            message: 'Sensor Added Successfully!' 
        })
    })
    .catch(error => {
        res.status(405).json({
            message: 'An error occured!'
        })
    })
}

// update an Sensor
const updateByID = (req, res, next) => {
    let _id = req.body._id

    let updateData = {
        _id: req.body._id,
        userID: req.body.userID,
        type: req.body.type
    }

    Sensor.findByIdAndUpdate(_id, {$set: updateData})
    .then(() => {
        res.json({
            message: 'Sensor updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An erorr occured!'
        }) 
    })
}

// delete an Sensor
const destroyByID = (req, res, next) => {
    let _id = req.body._id
    Sensor.findByIdAndRemove(_id)
    .then(() => {
        res.status(200).json({
            message: 'Sensor delete successfully'
        })
    })
    .catch(error => {
        res.status(405).json({
            message: 'An error occured!'
        })
    })
}

module.exports = {
    showAll, showByID, showByUserID, store, updateByID, destroyByID
}
