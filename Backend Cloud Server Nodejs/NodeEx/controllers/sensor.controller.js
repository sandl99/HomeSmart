const {showBySensorID} = require('./dbcontroller/SensorDataController')

const getSensor = (req, res) => {
    if (!res.locals.sensor) {
        res.status(404).json("Sensor not found")
    } else {
        res.status(200).json(res.locals.sensor)
    }
}

const getSensorByUserID = async (req, res) => {
    console.log('getSensorByUserID')
    if (!res.locals.sensor) {
        res.status(404).json("Sensor not found")
    } else {
        let result = []

        const length = res.locals.sensor.length
        console.log('leng=' + length)
        let count = 0
        res.locals.sensor.forEach(async (sensor) => {
            //  console.log("Something")
            let now = Date.now()
            var data = await showBySensorID(sensor._id)
            count++
            // console.log(data.createdAt.getTime())
            // console.log("Lufy")
            if (now - data.createdAt.getTime() > 7000) {
                result.push({'_id': sensor._id, 'type': sensor.type, 'value': data.value, 'err': 1})
                // console.log('1')
            } else {
                result.push({'_id': sensor._id, 'type': sensor.type, 'value': data.value, 'err': 0})
                // console.log('2')
            }
            // console.log("Count = " + count)
            if (count == length) res.send(JSON.stringify(result));
        })
        // while (result.length != res.locals.sensor.length) {
        //     console.log(result)
        //     res.send(JSON.stringify(result));
        // }
    }
}

module.exports = {getSensor, getSensorByUserID}