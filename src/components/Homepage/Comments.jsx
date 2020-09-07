import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Comment from "./Comment";
import AddComment from "./AddComment";

export class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }
  componentDidMount = async () => {
    let response = await fetch(
      `http://localhost:3333/comments/${this.props.id}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
        }),
      }
    );
    let comments = await response.json();
    // console.log(comments)
    this.setState({ comments });
  };
  render() {
    return (
      <Container className="mb-2">
        <AddComment postId={this.props.id} />
        {this.state.comments
          ? this.state.comments.map((comment) => (
              <Comment info={comment} key={comment._id} />
            ))
          : null}
      </Container>
    );
  }
}

export default Comments;
