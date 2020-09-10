import React, { Component } from "react";
import "../../styles/MessageBar.css";
import { TiEdit } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";
import { MdClose, MdSend } from "react-icons/md";
import io from "socket.io-client";
import { GoPrimitiveDot } from "react-icons/go";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;
class MessageBar extends Component {
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
    let response = await fetch(`http://localhost:3003/user`, {
      method: "GET",
      credentials: "include",
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });
    let parsedJson = await response.json();
    console.log(parsedJson);
    /*
    parsedJson.forEach((element) => {
      const base64 = this.bufferToBase64(element.image.data);
      element.image = base64;
    });
    console.log(this.props.user.username);
    */

    setTimeout(() => {
      let filteredConnections = parsedJson.filter(
        (element) => element.username !== this.props.user.username
      );
      let filteredMessages = this.props.msgs.filter(
        (msg) =>
          (msg.from === this.state.recipientUsername &&
            msg.to === this.state.senderUsername) ||
          (msg.from === this.state.senderUsername &&
            msg.to === this.state.recipientUsername)
      );
      console.log(filteredMessages);
      this.setState({
        liveConnections: this.props.liveConnections,
        senderUsername: this.props.user.username,
        messages: this.props.msgs,
        connections: filteredConnections,
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
      let filteredMessages = this.props.msgs.filter(
        (msg) =>
          (msg.from === this.state.recipientUsername &&
            msg.to === this.state.senderUsername) ||
          (msg.from === this.state.senderUsername &&
            msg.to === this.state.recipientUsername)
      );
      console.log(filteredMessages);
      this.setState({ messages: filteredMessages });
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
      messages: [],
    });

    setTimeout(() => {
      let filteredMessages = this.props.msgs.filter(
        (msg) =>
          (msg.from === this.state.recipientUsername &&
            msg.to === this.state.senderUsername) ||
          (msg.from === this.state.senderUsername &&
            msg.to === this.state.recipientUsername)
      );
      this.setState({ messages: filteredMessages });
    }, 500);
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
                    alt=""
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
                    <>
                      {/*
                      {((message.from === this.state.recipientUsername &&
                        message.to === this.state.senderUsername) ||
                        (message.from === this.state.senderUsername &&
                          message.to === this.state.recipientUsername)) && (
                        <p
                          className={
                            message.from === this.state.senderUsername
                              ? "textright"
                              : "textleft"
                          }
                        >
                          {message.text}
                        </p>
                      )}
                        */}
                      <p
                        className={
                          message.from === this.state.senderUsername
                            ? "textright"
                            : "textleft"
                        }
                      >
                        {message.text}
                      </p>
                      <p id="time">{message.time}</p>
                    </>
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
