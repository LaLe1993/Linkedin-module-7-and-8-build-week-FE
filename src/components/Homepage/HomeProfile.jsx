import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class homeprofile extends Component {
  state = {
    image: "",
    user: null,
  };
  bufferToBase64(buf) {
    var binstr = Array.prototype.map
      .call(buf, function (ch) {
        return String.fromCharCode(ch);
      })
      .join("");
    return btoa(binstr);
  }
  componentDidMount = async () => {
    let response = await fetch(
      "https://be-linkedin.herokuapp.com/profile/user1",
      {
        method: "GET",
        headers: new Headers({
          Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
          "Content-type": "application/json",
        }),
      }
    );
    let parsedJson = await response.json();
    let user = parsedJson[0];
    const base64 = this.bufferToBase64(user.image.data);
    console.log(user);
    this.setState({ image: base64, user });
  };
  render() {
    return (
      <div className="leftSidebarShadow">
        {this.state.user ? (
          <>
            {" "}
            <div className="home back">
              <img
                className="img-fluid"
                src="https://miro.medium.com/max/1124/1*92adf06PCF91kCYu1nPLQg.jpeg"
                alt=""
              />
            </div>
            <img
              className="img-fluid rounded-circle first"
              src={`data:image/jpeg;base64,${this.state.image}`}
            />
            <div
              className=" home p-2 text-center"
              style={{ borderBottom: "0px" }}
            >
              <p className="p1">Welcome, {this.state.user.name}</p>
              <a className="a1">Update your profile</a>
            </div>
            <div className="p-2  home" style={{ borderBottom: "0px" }}>
              <p className="p2">Who viewed your profile </p>
              <p className="p2">Connections </p>
              <p className="p3">Grow your Network</p>
            </div>
            <div className="p-2  home" style={{ borderBottom: "0px" }}>
              <p className="p3">See all premium features</p>
            </div>
            <div className="p-2 home">
              <p className="p3">Saved Items</p>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}
