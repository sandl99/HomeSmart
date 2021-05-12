var express = require('express')
var app = express()

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

app.use('/user/:id', function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
  })
console.log(Date.now())