import { connect, useStore } from 'react-redux'
import { mapBackToFrontSensorType } from '../utils'
import SensorComponent from './SensorComponent'
import '../css/SensorTab.css'
import { sensorImageURL } from '../config'

const SensorTab = () => {
    const store = useStore()
    const sensors = store.getState()?.sensor ? store.getState().sensor : [] 

    return (
        <div id="sensor-tab">
            {
                sensors.map((sensor) => {
                    const image = sensorImageURL[mapBackToFrontSensorType(sensor.type)]
                    return (
                        <SensorComponent path={image} value={sensor.value} sensorID={sensor['_id']} />
                    )
                })
            }
        </div>
    )
}

export default connect()(SensorTab)