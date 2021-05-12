const mqtt = require('mqtt')
const client = mqtt.connect(({host: '127.0.0.1', port : 1884}))

client.on("connect",function(){	
    console.log("Connected to MQTT 127.0.0.1:1884");
})
client.publish('home/led', "on")


const getDevice = (req, res) => {
    if (!res.locals.device) {
        res.status(404).json("Device not found")
    }
    else 
    {
        res.json(res.locals.device)
    }
    res.end()
}

const getDeviceByUserID = (req, res) => {
    if (!res.locals.device) {
        res.status(404).json("Device not found")
    } else {
        res.json(res.locals.device)
    }
}

const setStatus = (req, res) => {
        console.log('publish')
        if (req.body.status)
            client.publish('home/led', "on")
        else
            client.publish('home/led', "off")
}

module.exports = {getDevice, getDeviceByUserID, setStatus}