import { createStore } from "redux"
let reducer = (state, action) => {
    if (action.type === "login-success") {
        return { ...state, loggedIn: true }
    }
    if (action.type === "set-messages") {
        return { ...state, msgs: action.messages }
    }
    if (action.type === "active-users") {
        return { ...state, activeUsers: action.activeUsers }
    }

    return state
}
const store = createStore(
    reducer,
    { msgs: [], loggedIn: false, activeUsers: [] },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store 