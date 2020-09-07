import React, { Component } from "react";
import {
  Navbar,
  Nav,
  FormControl,
  Form,
  Container,
  Row,
  Dropdown,
} from "react-bootstrap";
import { GrLinkedin } from "react-icons/gr";
import {
  AiOutlineHome,
  AiOutlineTeam,
  AiOutlinePlaySquare,
} from "react-icons/ai";
import { RiBriefcaseLine } from "react-icons/ri";
import { MdMessage } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import photo from "../images/photo.png";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import usersData from "./HOC/FetchUsers";

class NavBar extends Component {
  state = {
    search: "",
    users: [],
    show: false,
    image: "",
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
    this.setState({ users: this.props.users });
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

    const base64 = this.bufferToBase64(parsedJson[0].image.data);
    this.setState({ image: base64 });
  };
  render() {
    return (
      <Navbar
        className="navbar mt-0 fixed-top "
        style={{ height: "55px" }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand>
            <Link to="/feed/me">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Linkedin_icon.svg/1200px-Linkedin_icon.svg.png"
                className="linked"
              />
            </Link>
          </Navbar.Brand>
          <Form>
            <Dropdown>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                style={{ width: "250px", height: "33px" }}
                onChange={(e) => {
                  this.setState({ search: e.target.value });
                  if (e.target.value.length >= 1) {
                    this.setState({ show: true });
                  } else {
                    this.setState({ show: false });
                  }
                }}
              />
              <Dropdown.Menu show={this.state.show}>
                {this.state.show ? (
                  this.props.users.map((element) => {
                    {
                      console.log(element);
                    }
                    if (
                      element.name.toLowerCase().includes(this.state.search)
                    ) {
                      return (
                        <>
                          <Dropdown.Item>
                            <Link to={"/profile/" + element.username}>
                              {element.name}
                            </Link>
                          </Dropdown.Item>
                        </>
                      );
                    }
                  })
                ) : (
                  <p>notfound</p>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Form>
          <Nav className="ml-auto">
            <Link className="nav-link navIcon" to="/feed/me">
              <AiOutlineHome style={{ fontSize: "20px" }} />
              <div style={{ fontSize: "13px" }}>Home</div>
            </Link>
            <Link className="navIcon nav-link" to="/myNetwork">
              {" "}
              <AiOutlineTeam style={{ fontSize: "20px" }} />
              <div style={{ fontSize: "13px" }}>My Network</div>
            </Link>
            <Nav.Link className="navIcon">
              <RiBriefcaseLine style={{ fontSize: "20px" }} />
              <div style={{ fontSize: "13px" }}> Jobs</div>
            </Nav.Link>
            <Nav.Link className="navIcon">
              <MdMessage style={{ fontSize: "20px" }} />
              <div style={{ fontSize: "13px" }}> Messaging</div>
            </Nav.Link>
            <Nav.Link className="navIcon">
              <IoMdNotificationsOutline style={{ fontSize: "20px" }} />
              <div style={{ fontSize: "13px" }}> Notifications</div>
            </Nav.Link>
            <Link className="nav-link" to="/profile/user1">
              <img
                src={`data:image/jpeg;base64,${this.state.image}`}
                style={{ borderRadius: "50%", height: "20px", width: "20px" }}
              ></img>
              <div style={{ fontSize: "13px" }}>
                Me{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  data-supported-dps="16x16"
                  fill="currentColor"
                  width="16"
                  height="16"
                  focusable="false"
                >
                  <path d="M8.8 10.66L14 5.12a.07.07 0 00-.07-.12H2.07a.07.07 0 00-.07.12l5.2 5.54a1.1 1.1 0 001.6 0z"></path>
                </svg>
              </div>
            </Link>
            <Nav.Link
              style={{ borderRight: "1px grey solid", height: "57px" }}
            ></Nav.Link>
            <Nav.Link className="navIcon" href="#work">
              <BsGrid3X3GapFill style={{ fontSize: "20px" }} />
              <div style={{ fontSize: "13px" }}>
                {" "}
                Work{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  data-supported-dps="16x16"
                  fill="currentColor"
                  width="16"
                  height="16"
                  focusable="false"
                >
                  <path d="M8.8 10.66L14 5.12a.07.07 0 00-.07-.12H2.07a.07.07 0 00-.07.12l5.2 5.54a1.1 1.1 0 001.6 0z"></path>
                </svg>
              </div>
            </Nav.Link>
            <Nav.Link className="navIcon" href="#learning">
              <AiOutlinePlaySquare style={{ fontSize: "20px" }} />
              <div style={{ fontSize: "13px" }}>Learning</div>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default usersData(NavBar);
