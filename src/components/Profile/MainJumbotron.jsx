import React, { Component } from "react";
import {
  Jumbotron,
  Container,
  Button,
  Dropdown,
  DropdownButton,
  Modal,
  Form,
} from "react-bootstrap";
import { IconContext } from "react-icons";
import { FaCamera, FaPencilAlt, FaEye } from "react-icons/fa";
import { RiPencilLine } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router-dom";
export class MainJumbotron extends Component {
  state = {
    data: [],
    username: this.props.match.params.id,
    show: false,
    user: "",
    userImage: "",
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
    {
      console.log("USERNAME", this.state.username);
    }
    this.fetchData();
    let response = await fetch(
      "https://be-linkedin.herokuapp.com/profile/" + this.state.username,
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
    let base64 = this.bufferToBase64(user.image.data);
    user.image = base64;
    this.setState({ user });
  };

  componentDidUpdate = async (prevState) => {
    if (this.state.username !== this.props.username) {
      console.log("HEREHRERE");
      this.setState({ username: this.props.username }, async () => {
        await this.fetchData();
      });
    }
  };
  async fetchData() {
    let response = await fetch(
      `https://be-linkedin.herokuapp.com/profile/` + this.state.username,
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
    let base64 = this.bufferToBase64(user.image.data);
    user.image = base64;
    this.setState({ user });
  }
  verifyProfile = async () => {
    console.log(this.state.data);
    if (this.state.data.username === this.state.user) {
      this.setState({ show: true });
    }
  };

  downloadCV = async () => {
    try {  
      window.open("https://be-linkedin.herokuapp.com/profile/"+ this.state.user._id + "/profilePDF")
    } 
    catch (error) {
      console.log("This current error" + error + "happened when trying to print the user experiences")      
    }
  };
  render() {
    return (
      <>
        {this.state.data !== "undefined" && (
          <Jumbotron>
            {console.log("DATA AFTER CONDITION", this.state.data)}
            {console.log("USER NAMEE", this.state.data.name)}
            <div className="bgImage">
              <img
                src="https://miro.medium.com/max/1124/1*92adf06PCF91kCYu1nPLQg.jpeg"
                alt=""
              />
              <IconContext.Provider value={{ className: "jumbotronCamera" }}>
                <div>
                  <FaCamera />
                </div>
              </IconContext.Provider>
            </div>
            <div id="profileSection">
              <div style={{ cursor: "pointer" }}>
                {this.state.user.image ? (
                  <img
                    onClick={this.verifyProfile}
                    src={`data:image/jpeg;base64,${this.state.user.image}`}
                    alt=""
                  />
                ) : (
                  <img
                    onClick={this.verifyProfile}
                    src="https://capenetworks.com/static/images/testimonials/user-icon.svg"
                    alt=""
                  />
                )}
                {/* <img src="https://capenetworks.com/static/images/testimonials/user-icon.svg" alt=""/> */}
              </div>
              <div id="profileButtons">
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Add profile section"
                >
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </DropdownButton>
                <Button variant="outline-info" onClick={this.downloadCV}>
                  Download CV
                </Button>
                <IconContext.Provider value={{ className: "editIcon" }}>
                  <div>
                    <RiPencilLine />
                  </div>
                </IconContext.Provider>
              </div>
            </div>
            <div id="profileInfo">
              <div id="info">
                <div id="personalInfo">
                  <p>{this.state.user.name + " " + this.state.user.surname}</p>
                  <p>{this.state.user.title}</p>
                  <p>
                    {this.state.user.area} -<span> 51 connections </span>-
                    <span> Contact info </span>
                  </p>
                </div>
                <p>Leibniz Universitat Hannover</p>
              </div>
            </div>
            <div id="present">
              <div>
                <p>Open to job opportunities</p>
                <p>{this.state.user.bio}</p>
                <p>See all details</p>
              </div>
              <IconContext.Provider value={{ className: "editIcon" }}>
                <div>
                  <RiPencilLine />
                </div>
              </IconContext.Provider>
            </div>
            <div id="presentBelowSection">
              <IconContext.Provider value={{ className: "eyeIcon" }}>
                <div>
                  <FaEye />
                </div>
              </IconContext.Provider>
              <p>All LinkedIn members</p>
            </div>
          </Jumbotron>
        )}
        <div id="about">
          <div>
            <p style={{ fontSize: "24px" }}>About</p>
            <p>working on Computational methods in Engineering</p>
          </div>
          <IconContext.Provider value={{ className: "editIcon" }}>
            <div>
              <RiPencilLine />
            </div>
          </IconContext.Provider>
        </div>

        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.File
                  label="Example file input"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    const formData = new FormData();
                    formData.append("profile", event.target.files[0]);
                    console.log(formData);
                    fetch(
                      `https://striveschool.herokuapp.com/api/profile/${this.state.user}/picture`,
                      {
                        method: "POST",
                        body: formData,
                        headers: {
                          Authorization:
                            "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
                        },
                      }
                    ).then((element) => console.log(element.json()));
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={(e) => this.setState({ show: false })}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(MainJumbotron);
