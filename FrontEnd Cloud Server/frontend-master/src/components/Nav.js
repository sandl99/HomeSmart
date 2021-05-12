import { connect } from 'react-redux'
import { NavLink, Link, useHistory } from 'react-router-dom'
import '../css/Nav.css'

const Nav = (props) => {
    const history = useHistory()

    return (
        <nav>
            <h2>SMART HOME SYSTEM</h2>
            <ul>
                <li>
                    <NavLink activeClassName="is-active" to="/home">Home</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="is-active" to="/sensor">Sensor</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="is-active" to="/device">Device</NavLink>
                </li>
                <li>
                    <button type="button" onClick={
                        (e) => {
                            props.logout()
                            history.push("/")
                        }
                    }>Logout</button>
                </li>
            </ul>
        </nav>
    )
}

const mapDispatchToProps = (dispatch) => {
    return ({
        logout: () => dispatch({type: 'TOGGLE'})
    })
}

export default connect(null, mapDispatchToProps)(Nav)