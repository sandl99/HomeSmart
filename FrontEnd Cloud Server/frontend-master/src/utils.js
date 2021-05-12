const mapBackToFrontDeviceType = (type) => {
    switch (type) {
        case "TV": return 'Television'
        case "Refrigerator": return 'Refrigerator'
        default: return 'default'
    }
}

const mapBackToFrontSensorType = (type) => {
    switch (type) {
        case 'Temperature': return 'Temperature'
        case 'Humidity': return 'Humidity'
        case 'Pressure': return 'Pressure'
        default: return 'default'
    }
}

export { mapBackToFrontDeviceType, mapBackToFrontSensorType }