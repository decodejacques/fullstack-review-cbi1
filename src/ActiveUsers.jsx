import React, { Component } from "react"
import { connect } from "react-redux"
class UnconnectedActiveUsers extends Component {

    render = () => {
        return (<ul>
            {this.props.activeUsers.map(au => {
                return (<li>{au}</li>)
            })}
        </ul>)
    }
}
let mapStateToProps = state => {
    return {
        activeUsers: state.activeUsers
    }
}
let ActiveUsers = connect(mapStateToProps)(UnconnectedActiveUsers)
export default ActiveUsers 