import React, { Component } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;
export class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
    };
  }
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
      `http://localhost:3003/profile/${this.props.info.username}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
        }),
      }
    );
    let parsedJson = await response.json();
    let userInfo = parsedJson[0];
    const base64 = this.bufferToBase64(userInfo.image.data);
    userInfo.image = base64;
    // console.log(userInfo)
    this.setState({ userInfo });
  };
  deleteComment = async (id) => {
    let response = await fetch(`http://localhost:3003/comments/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("comment deleted");
    }
  };
  render() {
    return (
      <Container id="comment" className="mt-2">
        <div id="commentImage">
          {console.log("comment", this.props.user.linkedInImage)}
          {this.props.user.linkedInImage ? (
            <img src={this.props.user.linkedInImage} alt="" />
          ) : (
            <img
              src={`data:image/jpeg;base64,${this.props.user.image}`}
              alt=""
            />
          )}
        </div>
        <div>
          <div id="commentHeader">
            <p>{this.state.userInfo.name}</p>
            <p>{this.state.userInfo.bio}</p>
          </div>
          <div id="commentBody">{this.props.info.comment}</div>
          <div id="editComment">
            <Dropdown>
              <Dropdown.Toggle className="d-flex">
                <BsThreeDots />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => this.deleteComment(this.props.info._id)}
                >
                  Delete Comment
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Comment);
