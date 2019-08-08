import React, { Component } from "react"
import { connect } from "react-redux"
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import ChatMessages from './ChatMessages.jsx'
import ChatForm from './ChatForm.jsx'
import ActiveUsers from './ActiveUsers.jsx'
class UnconnectedApp extends Component {

    render = () => {
        if (this.props.lgin) {
            return (<div>
                <div className="chat-and-users">
                    <ChatMessages />
                    <ActiveUsers />
                </div>
                <ChatForm />
            </div>)
        }
        return (
            <div>
                <h1>Signup</h1>
                <Signup />
                <h1>Login</h1>
                <Login />
            </div>)
    }
}
let mapStateToProps = state => {
    return { lgin: state.loggedIn }
}
let App = connect(mapStateToProps)(UnconnectedApp)
export default App 