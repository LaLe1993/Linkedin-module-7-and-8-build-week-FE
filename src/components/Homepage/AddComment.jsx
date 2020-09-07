import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { MdSend } from "react-icons/md";
import { IconContext } from "react-icons";
export class AddComment extends Component {
  state = {
    user: [],
    comments: {
      comment: "",
      postId: this.props.postId,
    },
  };
  bufferToBase64(buf) {
    var binstr = Array.prototype.map
      .call(buf, function (ch) {
        return String.fromCharCode(ch);
      })
      .join("");
    return btoa(binstr);
  }
  fetchComments = async () => {
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
    const user = parsedJson[0];
    const base64 = this.bufferToBase64(user.image.data);
    user.image = base64;
    console.log(user);
    this.setState({ user });
  };
  componentDidMount = async () => {
    this.fetchComments();
  };
  updateComment = (e) => {
    let comments = this.state.comments;
    let id = e.currentTarget.id;
    comments[id] = e.currentTarget.value;
    this.setState({ comments });
  };
  sendComment = async () => {
    let response = await fetch("https://be-linkedin.herokuapp.com/comments", {
      method: "POST",
      body: JSON.stringify(this.state.comments),
      headers: new Headers({
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
        "Content-type": "application/json",
        user: "user1",
      }),
    });
    if (response.ok) {
      alert("comment added");
      this.setState({ commentText: "" });
      this.fetchComments();
    }
  };
  render() {
    return (
      <Container id="comment" className="mt-2">
        <div id="commentImage">
          <img src={`data:image/jpeg;base64,${this.state.user.image}`} alt="" />
        </div>
        <div id="content">
          <input type="text" id="comment" onChange={this.updateComment} />
          <IconContext.Provider value={{ className: "sendIcon" }}>
            <p onClick={this.sendComment}>
              <MdSend />
            </p>
          </IconContext.Provider>
        </div>
      </Container>
    );
  }
}

export default AddComment;
