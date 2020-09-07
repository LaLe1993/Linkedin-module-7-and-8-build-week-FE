import React, { Component } from "react";
import "../../styles/MessageBar.css";
import { TiEdit } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";
import { MdClose, MdSend } from "react-icons/md";
import io from "socket.io-client";
export class MessageBar extends Component {
  socket = null;
  constructor(props) {
    super(props);
    this.state = {
      connections: [],
      bottom: 0,
      showChatbox: false,
      recipientName: "",
      senderUsername: "user18",
      recipientUsername: "user20",
      message: "",
      messages: [],
      check: true,
    };
  }
  //
  //
  bufferToBase64(buf) {
    var binstr = Array.prototype.map
      .call(buf, function (ch) {
        return String.fromCharCode(ch);
      })
      .join("");
    return btoa(binstr);
  }
  componentDidMount = async () => {
    let response = await fetch(`https://be-linkedin.herokuapp.com/profile`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic dXNlcjE4OlEyejVWN2hFRlU2SktSckU=",
        "Content-type": "application/json",
      }),
    });
    let parsedJson = await response.json();
    parsedJson.forEach((element) => {
      const base64 = this.bufferToBase64(element.image.data);
      element.image = base64;
    });
    this.setState({ connections: parsedJson });
    let messagesResponse = await fetch(
      "https://striveschool-test.herokuapp.com/api/messages/user18"
    );
    let messages = await messagesResponse.json();
    console.log(messages);
    this.setState({ messages });
    // socket part
    const connOpt = {
      transports: ["websocket"],
    };
    // this.socket = io("https://striveschool-api.herokuapp.com/", connOpt);
    this.socket = io("https://striveschool.herokuapp.com/", connOpt);
    this.socket.on("connect", () => {
      console.log("connected!");
      alert("connected");
    });
    this.socket.emit("setUsername", {
      username: this.state.senderUsername,
    });
    this.socket.on("chatmessage", (msg) =>
      this.setState({
        messages: this.state.messages.concat(msg),
        check: false,
      })
    );
  };

  handleMessaging = () => {
    if (this.state.bottom === 0) {
      this.setState({ bottom: -245 });
    } else {
      this.setState({ bottom: 0 });
    }
  };
  openChatbox = (name) => {
    this.setState({ showChatbox: true, recipientName: name });
  };
  closeChatbox = () => {
    this.setState({ showChatbox: false, recipientName: "" });
  };
  updateMessage = (e) => {
    this.setState({ message: e.currentTarget.value });
  };
  sendMessage = (e) => {
    e.preventDefault();
    if (this.state.message !== "") {
      console.log("hello");
      this.socket.emit("chatmessage", {
        //  from:this.state.senderUsername,
        to: this.state.recipientUsername,
        text: this.state.message,
      });
      this.setState({ message: "" });
    }
  };
  render() {
    return (
      <>
        <div id="message" style={{ bottom: `${this.state.bottom}px` }}>
          <div id="messagebar">
            <div id="header">
              <img src="" alt="" />
              <p onClick={this.handleMessaging}>Messaging</p>
            </div>
            <div id="icons">
              <p>{<TiEdit />}</p>
              <p>{<BsThreeDots />}</p>
            </div>
          </div>
          <div id="connections">
            {this.state.connections.map((connection) => {
              return (
                <div id="connection">
                  <img
                    src={`data:image/jpeg;base64,${connection.image}`}
                    alt="image"
                  />
                  <a onClick={() => this.openChatbox(connection.name)}>
                    {connection.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        {this.state.showChatbox ? (
          <div id="chatbox">
            <div id="header">
              <div id="name">
                <p>{this.state.recipientName}</p>
              </div>
              <div id="icons">
                <p>{<TiEdit />}</p>
                <p onClick={this.closeChatbox}>{<MdClose />}</p>
              </div>
            </div>
            <div id="chat">
              <div id="messages">
                {this.state.messages.map((message) => {
                  return (
                    <p
                      className={
                        message.from === this.state.senderUsername
                          ? "text-right"
                          : "text-left"
                      }
                    >
                      {message.text}
                    </p>
                  );
                })}
              </div>
              <div id="input">
                <input
                  type="text"
                  value={this.state.message}
                  onChange={this.updateMessage}
                />
                <p onClick={this.sendMessage}>{<MdSend />}</p>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default MessageBar;
