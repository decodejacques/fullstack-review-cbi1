import React, { Component } from "react"
import { connect } from "react-redux"
class UnconnectedChatMessages extends Component {
    componentDidMount = () => {
        let updateMessages = async () => {
            let response = await fetch("/messages")
            let responseBody = await response.text()
            console.log("response from messages", responseBody)
            let parsed = JSON.parse(responseBody)
            if (parsed.success === false) {

                document.location.reload()
            }
            console.log("parsed", parsed)
            this.props.dispatch({
                type: "set-messages",
                messages: parsed.msgs
            })
            this.props.dispatch({
                type: "active-users",
                activeUsers: parsed.activeUsers
            })

        }
        setInterval(updateMessages, 500)
    }
    render = () => {
        let msgToElement = e => {


            return (<li> {e.username}:
                <div>{e.message} </div>
                {e.imgPath ? <div><img src={e.imgPath} /></div> : null}
                <div><img src={e.imgURL} /> </div>
            </li>)
        }
        return (
            <div>
                <ul>{this.props.messages.map(msgToElement)}</ul>
            </div>)
    }
}
let mapStateToProps = state => {
    return {
        messages: state.msgs
    }
}
let Chat = connect(mapStateToProps)(UnconnectedChatMessages)
export default Chat 