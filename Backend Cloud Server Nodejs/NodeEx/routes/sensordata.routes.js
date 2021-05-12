const exress = require('express')
const router = exress.Router()
const SensorDataDB = require('../controllers/dbcontroller/SensorDataController')
const SensorDataCtrl = require('../controllers/sensordata.controller')

router.route('./data')
    .get(SensorDataDB.showBySensorID, SensorDataCtrl.getLastestData)


module.exports = router