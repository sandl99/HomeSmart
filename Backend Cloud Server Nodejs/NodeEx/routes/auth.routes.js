const express = require('express')
const authCtrl = require('../controllers/auth.controller')
const { route } = require('./device.routes')
const router = express.Router()

router.route('/signin')
    .post(authCtrl.signin)
router.route('/signout')
    .post(authCtrl.signout)
router.route('/test')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization)
// router.route()
module.exports = router;