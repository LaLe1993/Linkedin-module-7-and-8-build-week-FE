import React, { Component } from "react";
import "../../styles/MessageBar.css";
import { TiEdit } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";
import { MdClose, MdSend } from "react-icons/md";
import io from "socket.io-client";
import { GoPrimitiveDot } from "react-icons/go";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;
export class MessageBar extends Component {
  socket = null;
  constructor(props) {
    super(props);
    this.state = {
      connections: [],
      liveConnections: [],
      bottom: 0,
      showChatbox: false,
      recipientName: "",
      senderUsername: "",
      recipientUsername: "",
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
    let response = await fetch(`http://localhost:3003/profile`, {
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
    console.log(this.props.user.username);
    let filteredConnections = parsedJson.filter(
      (user) => user.username !== this.props.user.username
    );
    setTimeout(() => {
      this.setState({
        liveConnections: this.props.liveConnections,
        connections: filteredConnections,
        senderUsername: this.props.user.username,
        messages: this.props.msgs,
      });
    }, 1000);
  };
  componentDidUpdate = async (prevProps) => {
    if (
      prevProps.liveConnections.length !== this.props.liveConnections.length
    ) {
      this.setState({ liveConnections: this.props.liveConnections });
    }
    if (prevProps.msgs.length !== this.props.msgs.length) {
      this.setState({ messages: this.props.msgs });
    }
  };

  handleMessaging = () => {
    if (this.state.bottom === 0) {
      this.setState({ bottom: -245 });
    } else {
      this.setState({ bottom: 0 });
    }
  };
  openChatbox = (user) => {
    this.setState({
      showChatbox: true,
      recipientName: user.name,
      recipientUsername: user.username,
    });
  };
  closeChatbox = () => {
    this.setState({ showChatbox: false, recipientName: "" });
  };
  updateMessage = (e) => {
    this.setState({ message: e.currentTarget.value });
  };
  sendMessageHandler = (e) => {
    e.preventDefault();
    if (this.state.message !== "") {
      this.props.sendMessageFn(
        this.state.recipientUsername,
        this.state.message
      );

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
                  <a onClick={() => this.openChatbox(connection)}>
                    {connection.name}
                  </a>
                  {this.state.liveConnections.length > 0 &&
                  this.state.liveConnections.find(
                    (liveconnection) =>
                      liveconnection.username === connection.username
                  ) ? (
                    <p id="liveIndicator">
                      <GoPrimitiveDot />
                    </p>
                  ) : null}
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
                          ? "textright"
                          : "textleft"
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
                <p onClick={this.sendMessageHandler}>{<MdSend />}</p>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default connect(mapStateToProps)(MessageBar);
