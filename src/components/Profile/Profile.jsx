import React, { Component } from "react";
import Footer from "../Footer";
import MainJumbotron from "./MainJumbotron";
import SideBar from "./SideBar";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import NavBar from "../NavBar";
import Experiences from "./Experiences";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "../../styles/ProfilePage.css";

class Profile extends Component {
  state = {
    username: this.props.match.params.id,
    users: [],
    experiences: [],
    show: false,
    searchKey: "",
    loading: true,
    name: "",
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
      `https://be-linkedin.herokuapp.com/profile/${this.state.username}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
          "Content-type": "application/json",
        }),
      }
    );
    let parsedJson = await response.json();
    this.setState({ name: parsedJson.username });
    console.log(parsedJson);
    this.fetchExperience();
  };
  componentDidUpdate = async (prevState) => {
    if (this.props.match.params.id !== this.state.username) {
      console.log("hello");
      this.setState({ username: this.props.match.params.id }, async () => {
        await this.fetchExperience();
      });
      //this.setState({ loading: true });
      //await this.fetchExperience();
      /*
      this.setState({ loading: true });
      let response = await fetch(
        `https://be-linkedin.herokuapp.com/profile/${this.state.username}`,
        {
          method: "GET",
          headers: new Headers({
            Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
            "Content-type": "application/json",
          }),
        }
      );
      let parsedJson = await response.json();
      this.setState({ name: parsedJson.username });
      this.setState({ username: this.props.match.params.id }, async () => {
        await this.fetchExperience();
      });
      */
    }
  };

  async fetchExperience() {
    let experience = {
      method: "GET",
      url: `https://be-linkedin.herokuapp.com/profile/${this.state.username}/experience`,
      headers: {
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
      },
    };
    let users = {
      method: "GET",
      url: `https://be-linkedin.herokuapp.com/profile/`,
      headers: {
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
      },
    };
    let experiences = await axios(experience);
    let experiencesData = experiences.data;
    experiencesData.forEach((experience) => {
      if (experience.image) {
        const base64 = this.bufferToBase64(experience.image.data);
        experience.image = base64;
      }
    });
    let usersData = await axios(users);
    this.setState({
      experiences: experiencesData,
      users: usersData.data,
      loading: false,
    });
  }
  render() {
    return (
      <>
        <NavBar />
        {this.state.loading ? (
          <div id="loadingAnimation">
            <img src="https://i.stack.imgur.com/h6viz.gif" alt="" />
          </div>
        ) : (
          <Container className="mt-5 pt-3">
            <Row>
              <Col className="col-8">
                <MainJumbotron username={this.state.username} />
                <div id="experiences">
                  <div id="header">
                    <p>Experience</p>
                    {this.state.username === "user1" && (
                      <Link to="/addExperience">
                        <FaPlus />
                      </Link>
                    )}
                  </div>
                  {this.state.experiences.map((element) => {
                    console.log(element);
                    return (
                      <Experiences
                        user={this.state.username}
                        id={element._id}
                        currentUser={element.username}
                        image={element.image}
                        role={element.role}
                        company={element.company}
                        startDate={element.startDate}
                      />
                    );
                  })}
                </div>
              </Col>
              <SideBar />
            </Row>
            <Footer />
          </Container>
        )}
      </>
    );
  }
}

export default Profile;
