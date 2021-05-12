import '../css/DeviceComponent.css'
import React from 'react'
import { baseURL } from '../config'

const DeviceComponent = (props) => {
    const [status, setStatus] = React.useState(props.status)

    const handleSwitch = async (event) => {

        const requestOptions = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: "1",
                _id: "1",
                status: !props.status
            })
        }

        const response = await fetch(baseURL + "api/v1/device/setStatus", requestOptions)
        const data = await response.json()
        setStatus(!status)
    }

    return (
        <div className="device-component">
            <div className="device-component-main">
                <img className="device-icon" src={`/images/${props.path}`} />
            </div>
            <div className="device-component-id">
                <span style={{fontWeight: 'bold', fontSize: '18px'}}>ID</span>
                <span style={{fontWeigt: 'normal', margin: '0 0 20px 0'}}>{props.deviceID}</span>
            </div>
            <div className="device-component-status">
                <span style={{fontWeight: 'bold'}}>Status</span>
                <button type="button" onClick={handleSwitch}>{status ? 'ON' : 'OFF'}</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        status: state.sensor[0]['_id']
    })
}

export default DeviceComponent