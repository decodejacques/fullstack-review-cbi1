import React, { Component } from "react"
class ChatForm extends Component {
    constructor(props) {
        super(props)
        this.state = { message: "" }
    }
    handleMessageChange = event => {
        console.log("new message", event.target.value)
        this.setState({ message: event.target.value })
    }
    handleSubmit = event => {
        event.preventDefault()
        console.log("form submitted")
        let data = new FormData()
        data.append("msg", this.state.message)
        data.append("newpic", this.state.file)
        data.append("imgURL", this.state.imgURL)
        fetch("/newmessage", {
            method: "POST",
            body: data,
            credentials: "include"
        })
    }
    handleFile = ev => {
        this.setState({ file: ev.target.files[0] })
    }
    handleImageURL = ev => {
        this.setState({ imgURL: ev.target.value })
    }
    kick = () => {
        let name = window.prompt("Who's the bad boy?")
        let data = new FormData()
        data.append("kickee", name)
        fetch('/kick', { method: "POST", body: data })
    }
    render = () => {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleMessageChange} type="text" />
                    <input onChange={this.handleFile} type="file" />
                    <input onChange={this.handleImageURL} type="text" />
                    <input type="submit" />
                </form>
                <button onClick={this.kick}>Kick!</button>
            </div>)
    }
}
export default ChatForm 