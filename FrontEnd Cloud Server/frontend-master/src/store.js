import { createStore } from 'redux';

// initialState
const initialState = {loggedIn: false}

// root reducer
const rootReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE': return Object.assign({}, state, {loggedIn: !state.loggedIn})
        case 'STORE_USER': return Object.assign({}, state, {userID: action.payload})
        case 'STORE_SENSOR_DATA': return Object.assign({}, state, {sensor: action.payload})
        case 'STORE_DEVICE_STATUS': return Object.assign({}, state, {device: action.payload})
        default: return state;
    }
}

// Create store
const store = createStore(rootReducer, initialState)

export default store;