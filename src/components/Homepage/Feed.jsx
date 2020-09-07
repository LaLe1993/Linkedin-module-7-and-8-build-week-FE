import React, { Component } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Posts from "./Posts";
import "../../styles/HomePage.css";
import FetchPosts from "../HOC/FetchPosts";
// import UploadPic from '../UploadPic'

class Feed extends Component {
  state = {
    posts: [],
    numberOfPosts: "",
    username: [],
    loading: true,
  };
  componentDidMount = async () => {
    let user = await fetch(
      "https://striveschool.herokuapp.com/api/profile/me",
      {
        method: "GET",
        headers: new Headers({
          Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
          "Content-type": "application/json",
        }),
      }
    );
    let fetchPosts = await fetch("https://be-linkedin.herokuapp.com/posts");
    let posts = await fetchPosts.json();
    this.setState({ posts, loading: false, numberOfPosts: posts.length });
    let userName = await user.json();

    this.setState({
      username: userName,
      // posts: this.props.posts,
    });
  };
  //

  /*
  componentDidUpdate = async (prevState) => {
    if (this.state.numberOfPosts !== prevState.numberOfPosts) {
      let refetch = await fetch("https://be-linkedin.herokuapp.com/posts");
      let posts = refetch.json();
      this.setState({ posts, loading: false });
    }
  };
*/
  handleShow = () => {
    this.setState({ show: true });
  };
  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <Container id="feed" fluid>
        <Row>
          <hr></hr>
          {this.state.loading ? (
            <div
              className="col col-12 d-flex justify-content-center"
              id="loadingAnimation"
            >
              <img src="https://i.stack.imgur.com/h6viz.gif" alt="" />
            </div>
          ) : (
            this.state.posts.map((element, i) => {
              return (
                <Posts
                  user={this.state.username}
                  delPost={this.props.deletePost}
                  post={element}
                  key={i}
                />
              );
            })
          )}
        </Row>
      </Container>
    );
  }
}

export default Feed;
