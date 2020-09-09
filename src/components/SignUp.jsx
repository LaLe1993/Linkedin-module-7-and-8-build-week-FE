import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Container,
  Row,
  Col,
  Card,
  Image,
} from "react-bootstrap";

class SignUp extends Component {
  state = {
    photo: null,
    newUser: {
      email: "",
      password: "",
    },
    profile: {
      name: "",
      surname: "",
      email: "",
      username: "",
      gender: [],
    },
  };

  addNewUser = async (e) => {
    e.preventDefault();
    const resp = await fetch("http://localhost:3003/user/signUp", {
      method: "POST",
      body: JSON.stringify(this.state.newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (resp.ok) {
      this.props.history.push("/");
    }
  };

  handleChange = (e) => {
    const newUser = this.state.newUser;
    newUser[e.currentTarget.id] = e.currentTarget.value;
    this.setState({
      newUser,
    });
  };

  render() {
    return (
      <Container className="mt-3">
        <Row>
          <Col
            sm={12}
            md={10}
            lg={6}
            className="offset-sm-0 offset-md-1 offset-lg-3"
          >
            <Card className="p-4 shadow" style={{ borderRadius: "5%" }}>
              <div className="d-flex justify-content-center mb-3    ">
                <Image
                  src="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo-2003%E2%80%932011.png"
                  className="w-25"
                ></Image>
              </div>
              <form onSubmit={this.addNewUser}>
                <FormGroup controlId="username" bsSize="large" as={Row}>
                  <FormLabel column sm="3">
                    Username
                  </FormLabel>
                  <Col sm="9">
                    <FormControl
                      autoFocus
                      id="username"
                      type="text"
                      value={this.state.newUser.username}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="name" bsSize="large" as={Row}>
                  <FormLabel column sm="3">
                    Name
                  </FormLabel>
                  <Col sm="9">
                    <FormControl
                      autoFocus
                      id="name"
                      type="text"
                      value={this.state.newUser.name}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="surname" bsSize="large" as={Row}>
                  <FormLabel column sm="3">
                    Surname
                  </FormLabel>
                  <Col sm="9">
                    <FormControl
                      autoFocus
                      id="surname"
                      type="text"
                      value={this.state.newUser.surname}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="email" bsSize="large" as={Row}>
                  <FormLabel column sm="3">
                    Email
                  </FormLabel>
                  <Col sm="9">
                    <FormControl
                      value={this.state.newUser.email}
                      onChange={(e) => this.handleChange(e)}
                      type="text"
                      id="email"
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="password" bsSize="large" as={Row}>
                  <FormLabel column sm="3">
                    Password
                  </FormLabel>
                  <Col sm="9">
                    <FormControl
                      value={this.state.newUser.password}
                      onChange={(e) => this.handleChange(e)}
                      type="password"
                      id="password"
                    />
                  </Col>
                </FormGroup>
                <Button block bsSize="large" type="submit">
                  Sign Up
                </Button>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignUp;
