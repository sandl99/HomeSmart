const Device = require('../../models/Device')

// Show  the list of Devices
const showAll = (req, res, next) => {
    Device.find()
    .then(response => {
        req.allDevice = response
    })
    .catch(err => {
        res.json({
            message: 'An error occured!'
        })
    })
    next()
}

// show single Device
const showByID = (req, res, next) => {
    let _id = req.query._id
    Device.findById(_id)
    .then(device => {
        res.locals.device = device
        next();
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}


// show Device by userID
const showByUserID = (req, res, next) => {
    console.log('dcm')
    Device.find({userID: req.query.userID})
    .then(response => {
        res.locals.device = response
        
        next()
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
    
}


// add new Device
const store = (req, res, next) => {
    let device = new Device({
        _id: req.body._id,
        userID: req.body.userID,
        type: req.body.type,
        status: req.body.status
    })
    device.save()
    .then(response => {
        res.status(200).json({
            message: 'Device Added Successfully!' 
        })
        next()
    })
    .catch(error => {
        res.status(405).json({
            message: 'An error occured!'
        })
    })
    
}

// update an Device
const updateByID = (req, res, next) => {
    let _id = req.body._id
    console.log('san')
    let updateData = {
        status: req.body.status
    }
    
    console.log(updateData)
    Device.findByIdAndUpdate(_id, {$set: updateData})
    .then(() => {
        res.status(200).json({
            message: 'Device updated Successfully!'
        })
        next()
    })
    .catch(error => {
        res.status(405).json({
            message: 'An erorr occured!'
        }) 
    })
    
}

// delete an Device
const destroyByID = (req, res, next) => {
    let _id = req.body._id
    console.log(_id)
    Device.findByIdAndRemove(_id)
    .then(() => {
        res.status(200).json({
            message: 'Device delete successfully'
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
