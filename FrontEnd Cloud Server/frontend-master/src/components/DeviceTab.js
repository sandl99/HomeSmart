import '../css/DeviceTab.css'
import DeviceComponent from './DeviceComponent'
import { useStore } from 'react-redux'
import { deviceImageURL } from '../config'
import { mapBackToFrontDeviceType } from '../utils'
import React from 'react'

const DeviceTab = () => {
    const store = useStore()
    const devices = store.getState()?.device ? store.getState().device : []

    return (
        <div id='device-tab'>
            {
                devices.map((device) => {
                    const image = deviceImageURL[mapBackToFrontDeviceType(device.type)]
                    return (
                        <DeviceComponent whole={devices} path={image} type={device.type} deviceID={device['_id']} status={device.status}/>
                    )
                })
            }
        </div>
    )
}

export default DeviceTab