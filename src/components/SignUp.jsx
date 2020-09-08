import React, {Component} from "react"
import {FormGroup,FormControl, Button, Container, Row} from "react-bootstrap"

const apiKey = process.env.BE_API_LOCAL;
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
            gender: []
        }
    }

    addNewUser = async (e) => {
        e.preventDefault();
        const resp = await fetch("http://localhost:3003/user/signUp", {
            method: "POST",
            body: JSON.stringify(this.state.newUser),
            headers : {
                "Content-Type": "application/json"
            }
        })
        if (resp.ok) {
            this.props.history.push("/");
        }
    }

    handleChange = (e) => {
        const newUser = this.state.newUser;
        newUser[e.currentTarget.id] = e.currentTarget.value;
        this.setState({
          newUser,
        });
      };

    render() {
        return(
          <Container className='d-flex justify-content-center '>
            <Row>
            <form onSubmit={this.addNewUser}>
                  <FormGroup controlId='username' bsSize='large'>
                    <label>Username</label>
                    <FormControl
                      autoFocus
                      id='username'
                      type='text'
                      value={this.state.newUser.username}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </FormGroup>
                  <FormGroup controlId='name' bsSize='large'>
                    <label>Name</label>
                    <FormControl
                      autoFocus
                      id='name'
                      type='text'
                      value={this.state.newUser.name}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </FormGroup>
                  <FormGroup controlId='surname' bsSize='large'>
                    <label>Surname</label>
                    <FormControl
                      autoFocus
                      id='surname'
                      type='text'
                      value={this.state.newUser.surname}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </FormGroup>
                  <FormGroup controlId='email' bsSize='large'>
                    <label>Email</label>
                    <FormControl
                      value={this.state.newUser.email}
                      onChange={(e) => this.handleChange(e)}
                      type='text'
                      id='email'
                    />
                  </FormGroup>
                  <FormGroup controlId='password' bsSize='large'>
                    <label>Password</label>
                    <FormControl
                      value={this.state.newUser.password}
                      onChange={(e) => this.handleChange(e)}
                      type='password'
                      id='password'
                    />
                  </FormGroup>
                  <Button block bsSize='large' type='submit'>
                    Sign Up
                  </Button>
                </form>
            </Row>
          </Container>
            
        )
    }
}

export default SignUp