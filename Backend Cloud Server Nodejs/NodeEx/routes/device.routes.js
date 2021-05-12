const express = require('express')
const deviceCtrl = require('../controllers/device.controller')
const deviceDB = require('../controllers/dbcontroller/DeviceController')
const router = express.Router()

router.route('/')
    .get(deviceDB.showByID, deviceCtrl.getDevice)

router.route('/user')
    .get(deviceDB.showByUserID, deviceCtrl.getDeviceByUserID)

router.route('/setStatus')
    .put(deviceDB.updateByID, deviceCtrl.setStatus)

router.route('/addDevice')
    .post(deviceDB.store)

router.route('/delDevice')
    .delete(deviceDB.destroyByID)
    
module.exports = router