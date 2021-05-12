import React from 'react';
import { BrowserRouter, Redirect, Switch, Route, useHistory } from "react-router-dom"
import Nav from './components/Nav'
import Home from './components/Home'
import SensorTab from './components/SensorTab'
import DeviceTab from './components/DeviceTab'
import Login from './components/Login'
import store from './store';
import { Provider, connect, useStore } from 'react-redux'
import { baseURL } from './config'

const App = (props) => {
    const store = useStore()
    const [toggleDevice, setToggleDevice] = React.useState("initial")
    const [toggleSensor, setToggleSensor] = React.useState("initial")

    React.useEffect(() => {
        console.log("LoggedIn useEffect")
        if (props.loggedIn) {
            setToggleDevice(true)
            setToggleSensor(true)
        }
    }, [props.loggedIn])

    React.useEffect(() => {
        if (toggleDevice === 'initial') return
        console.log("Toggle device useEffect")
        const timeoutID = setTimeout(async () => {
            const params = `?userID=${store.getState().userID}`
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            }

            const response = await fetch(baseURL + "api/v1/device/user" + params, requestOptions)
            const data = await response.json()
            props.storeDeviceStatus(data)
            if (props.loggedIn) setToggleDevice(!toggleDevice)

        }, 5000)
        return () => clearTimeout(timeoutID)
    }, [toggleDevice])

    React.useEffect(() => {
        if (toggleSensor === "initial") return
        console.log("Toggle sensor useEffect")
        const timeoutID = setTimeout(async () => {
            const params = `?userID=${store.getState().userID}`
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            }

            const response = await fetch(baseURL + "api/v1/sensor/user" + params, requestOptions)
            const data = await response.json()
            console.log(data)
            props.storeSensorData(data)

            if (props.loggedIn) setToggleSensor(!toggleSensor)
        }, 3000)
        return () => clearTimeout(timeoutID)
    }, [toggleSensor])

    return (
        <BrowserRouter>
            <div>
                {props.loggedIn && <Nav />}
                <Switch>
                    <Route exact path="/">
                        {!props.loggedIn ? <Redirect to="/login" /> : <Redirect to="/home" />}
                    </Route>
                    <Route exact path="/login" component={Login}></Route>
                    <Route exact path="/sensor" component={SensorTab}></Route>
                    <Route exact path="/device" component={DeviceTab} rerender={toggleDevice}></Route>
                    <Route exact path="/home" component={Home}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeSensorData: (payload) => dispatch({type: 'STORE_SENSOR_DATA', payload: payload}),
        storeDeviceStatus: (payload) => dispatch({type: 'STORE_DEVICE_STATUS', payload: payload})
    }
}

const RootComponent = connect(mapStateToProps, mapDispatchToProps)(App)

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <RootComponent />
        </Provider>
    )
}

export default AppWrapper