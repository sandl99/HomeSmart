import { getImagePathBySensorType } from '../utils'
import '../css/SensorComponent.css'

const SensorComponent = (props) => {
    return (
        <div className="sensor-component">
            <div className="sensor-component-main">
                <img src={`/images/${props.path}`} className="sensor-ico"/>
            </div>
            <div className="sensor-component-id">
                <span style={{fontWeight: 'bold', fontSize: '20px'}}>ID</span>
                <span style={{fontSize: '20px'}}>{props.sensorID}</span>
            </div>
            <div className="sensor-component-value">
                <span>{props.value}</span>
            </div>
        </div>
    )
}

export default SensorComponent