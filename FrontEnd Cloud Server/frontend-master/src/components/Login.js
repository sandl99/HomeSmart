import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { connect, useStore } from 'react-redux'
import { baseURL } from '../config'
import '../css/Login.css';

const Login = (props) => {
    const history = useHistory()
    const store = useStore()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [authenticated, setAuthenticated] = useState("initial")

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(JSON.stringify({
            username: username,
            password: password
        }))

        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }

        let response = undefined
        let data = undefined
        try {
            response = await fetch(baseURL + "api/v1/auth/signin", requestOptions)
            data = await response.json()
            console.log(`Data receive: ${JSON.stringify(data)}`)
            console.log(`User: ${JSON.stringify(data['user'])}`)
            console.log(`Username: ${JSON.stringify(data['user']['_id'])}`)
            props.storeUser(data['user']['_id'])
            console.log(`State: ${JSON.stringify(store.getState())}`)
        }
        catch (error) {
            setAuthenticated("serverError")
            return
        }

        if (data?.error) {
            setAuthenticated("failed")
            return
        }
        
        setAuthenticated("authenticated")
    }

    React.useEffect(() => {
        if (authenticated === 'authenticated') {
            console.log("Authenticate successful !")
            props.authenticate()
            history.push("/")
        }
        else if (authenticated === 'failed') {
            console.log("Authenticate failed !")
        }
        else if (authenticated === "serverError") {
            console.log("Server error !")
        }
    }, [authenticated])

    const handleChange = (event) => {
        if (event.target.name === 'username') setUsername(event.target.value)
        else if (event.target.name === 'password') setPassword(event.target.value)
    }

    const Error = () => {
        if (authenticated === "failed"){
            return (
                <div className="auth-failed">
                    Authenticate failed !
                </div>
            )
        }

        else if (authenticated === "serverError") {
            return (
                <div className="auth-failed">
                    Server error !
                </div>
            )
        }

        return (
            <></>
        )
    }

    return (
        <>
            <div className="header">
                <h2>SMART HOME SYSTEM</h2>
            </div>
            <div className="container">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="text" id="username" name="username" placeholder="Username" onChange={handleChange} />
                    <label>Password</label>
                    <input type="password" id="password" name="password" onChange={handleChange} />
                    <button type="submit">Login</button>
                    <Error />
                </form>
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch({type: 'TOGGLE'}),
        storeUser: (user) => dispatch({type: 'STORE_USER', payload: user})
    }
}

export default connect(null, mapDispatchToProps)(Login)