import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import { createBrowserHistory } from "history";


export default class signin extends Component {
  state = {
    username: "",
    password: "",
    users: [],
    uValid: false,
    pValid: null,
  };

  componentDidMount() {
    this.fetchUsers();
  }
  async fetchUsers() {
    let gets = {
      method: "GET",
      url: "https://striveschool.herokuapp.com/api/profile/",
      headers: {
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
      },
    };
    let users = await axios(gets);
    this.setState({ users: users.data });
    console.log(users);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg={{ span: 6, offset: 3 }} className="text-center">
            <img
              className="img-fluid "
              src="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo-2003%E2%80%932011.png"
              style={{ maxHeight: "45px", marginTop: "4.7em" }}
              alt=""
            />
            <div className="mt-3">
              <h3>Welcome Back</h3>
              <p style={{ fontSize: "0.8em", opacity: "70%" }}>
                Don't miss your next opportunity. Sign in to stay updated on
                your professional world.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 4, offset: 4 }} className="text-center">
            <Form.Group style={{ marginTop: "0" }} controlId="ass">
              <Form.Control
                isValid={this.state.uValid}
                onChange={(e) => {
                  this.state.users.map((element) => {
                    if (e.target.value.length > 2) {
                      if (element.name === e.target.value) {
                        this.setState({ uValid: true,});
                        console.log(this.state.uInvalid);
                      } 
                    } else {
                      this.setState({ uValid: false,});
                    }
                  });
                  this.setState({ username: e.target.value });
                }}
                className="mb-3"
                type="email"
                placeholder="Email or Phone"
                size="lg"
              />
              <Form.Control
                size="lg"
                isValid={this.state.pValid}
                onChange={(e) => {
                  this.state.users.map((element) => {
                    if (e.target.value.length > 2) {
                      if (element.surname === e.target.value) {
                        this.setState({ pValid : true});
                        console.log(this.state.pValid);
                      } 
                    } else {
                      this.setState({ pValid: null, });
                      console.log(this.state.pValid)
                    }
                  });

                  this.setState({ password: e.target.value });
                }}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button
              className="w-100"
              variant="primary"
              onClick={() => {
                this.state.users.map((element) => {
                  let ch = false;
                  if (
                    element.name === this.state.username &&
                    element.surname === this.state.password
                  ) {
                    ch = true;
                  }
                  if (ch) {
                    this.props.history.push(`/feed/${element.username}`);
                  } else {
                  }
                });
              }}
            >
              Sign in
            </Button>
            <div className="mt-5">
              <a>Forgot Your Password ?</a>
              <p className="mt-3">
                New to LinkedIn? <a>Join now.</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
