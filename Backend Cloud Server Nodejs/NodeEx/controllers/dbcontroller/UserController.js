const User = require('../../models/User')

// Show  the list of Users
const showAll = (req, res, next) => {
    User.find()
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

// show single User
const showByID = (req, res, next) => {
    let _id = req.body._id
    User.findById(_id)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

const showByName = (req, res, next) => {
    let name = req.body.username
    User.findOne(
        {
            username: req.body.username
        }
    )
}

// add new User
const store = (req, res, next) => {
    let user = new User({
        _id: req.body._id,
        username: req.body.username,
        password: req.body.password
    })

    user.save()
    .then(response => {
        res.json({
            message: 'User Added Successfully!' 
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

// update an User
const updateByID = (req, res, next) => {
    let _id = req.body._id

    let updateData = {
        _id: req.body._id,
        username: req.body.username,
        password: req.body.password
    }

    User.findByIdAndUpdate(_id, {$set: updateData})
    .then(() => {
        res.json({
            message: 'User updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An erorr occured!'
        }) 
    })
}

// delete an User
const destroyByID = (req, res, next) => {
    let _id = req.body._id
    User.findByIdAndRemove(_id)
    .then(() => {
        res.json({
            message: 'User delete successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

module.exports = {
    showAll, showByID, store, updateByID, destroyByID
}
