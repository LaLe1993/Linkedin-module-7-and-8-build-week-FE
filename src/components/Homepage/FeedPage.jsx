import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HomeProfile from "./HomeProfile";
import Modal from "./Modal";
import NavBar from "../NavBar";
import axios from "axios";
import NewsFeedRightSidebar from "./NewsFeedRightSidebar";
import Leftsidebar from "./LeftSidebar";
import "../../styles/HomePage.css";
import { FiEdit, FiVideo } from "react-icons/fi";
import { GrCamera } from "react-icons/gr";
import { AiOutlineFileText } from "react-icons/ai";
import Posts from "./Posts";
import MessageBar from "../messaging/MessageBar";
export default class Homepage extends Component {
  state = {
    showModal: false,
    user: [],
    posts: [],
    postsText: "",
    inputFile: null,
    username: "user1",
    loading: true,
  };
  componentDidMount() {
    this.fetchData();
  }
  //
  bufferToBase64(buf) {
    var binstr = Array.prototype.map
      .call(buf, function (ch) {
        return String.fromCharCode(ch);
      })
      .join("");
    return btoa(binstr);
  }
  async postData() {
    this.setState({ loading: true });
    console.log(this.state.inputFile);
    let data1 = { text: this.state.postsText };
    let postData = {
      method: "POST",
      url: `https://be-linkedin.herokuapp.com/posts`,
      //url: `http://localhost:3333/posts`,
      headers: {
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
        user: "user1",
      },
      data: data1,
    };
    let data = await axios(postData);
    console.log(data.data);

    let inputFile = {
      method: "POST",
      // url: await `http://localhost:3333/posts/${data.data}`,
      url: await `https://be-linkedin.herokuapp.com/posts/${data.data}`,
      headers: {
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
        "Access-Control-Allow-Origin": "http://127.0.0.1:3000/",
      },
      data: this.state.inputFile,
    };
    let input = await axios(inputFile);

    this.fetchData();
    alert("Post has been posted");
  }

  async fetchData() {
    console.log(this.props.match.params.id);
    let response = {
      method: "GET",
      url: `https://be-linkedin.herokuapp.com/posts`,
      headers: {
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
      },
    };
    let Posts = await axios(response);
    let postsData = Posts.data;
    console.log(postsData);
    postsData.forEach((post) => {
      if (post.image) {
        const postbase64 = this.bufferToBase64(post.image.data);
        post.image = postbase64;
      }
      if (post.user.image) {
        const profilebase64 = this.bufferToBase64(post.user.image.data);
        post.user.image = profilebase64;
      }
    });
    this.setState({ posts: postsData.reverse(), loading: false });
  }
  //
  editPost = async (id, content) => {
    this.setState({ loading: true });
    const postText = {
      method: "PUT",
      url: `https://be-linkedin.herokuapp.com/posts/${id}`,
      headers: {
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
      },
      data: { text: content },
    };
    /*
    const postFile = {
      method: "POST",
      url: `https://be-linkedin.herokuapp.com/posts/${id}`,
      headers: {
        Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
        user: "user2",
      },
      data: this.state.file,
    };
    let file = await axios(postFile);
    */
    let text = await axios(postText);
    this.fetchData();
    alert("updated");
  };

  //
  deletePost = async (id) => {
    this.setState({ loading: true });
    let response = await fetch(
      `https://be-linkedin.herokuapp.com/posts/${id}`,
      {
        method: "DELETE",
        headers: new Headers({
          Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
        }),
      }
    );
    if (response.ok) {
      this.fetchData();
      // alert("Post deleted Sucessfully");
    }
  };

  render() {
    return (
      <>
        <NavBar />
        <Container className="mt-5 mb-2 pt-3">
          <Row>
            <Col lg={3}>
              <HomeProfile />
              <Leftsidebar />
            </Col>
            <Col lg={6} style={{ paddingLeft: "0px" }}>
              <Row className="feedShadow">
                <Col id="writePost" className="px-0">
                  <div
                    onClick={() => this.setState({ showModal: true })}
                    className="col col-6 w-100 d-flex align-items-center"
                    style={{ margin: "0px" }}
                  >
                    <a>
                      <FiEdit style={{ fontSize: "1.1rem" }} />
                    </a>
                    <a style={{ fontSize: "1.1em" }}>Start a Post</a>
                  </div>
                  <div id="icons" className="col col-6 px-0">
                    <div className="col col-4 d-flex justify-content-center align-items-center">
                      <GrCamera style={{ fontSize: "1.1rem" }} />
                    </div>

                    <div className="col col-4 d-flex justify-content-center align-items-center">
                      <FiVideo style={{ fontSize: "1.1rem" }} />
                    </div>

                    <div className="col col-4 d-flex justify-content-center align-items-center">
                      <AiOutlineFileText style={{ fontSize: "1.1rem" }} />
                    </div>
                  </div>
                </Col>
                <div id="writePostFooter">
                  <p>
                    <a href="">Write an article</a> on LinkedIn
                  </p>
                </div>
              </Row>

              {this.state.loading ? (
                <div
                  className="col col-5 d-flex justify-content-center"
                  id="loadingAnimation"
                >
                  <img src="https://i.stack.imgur.com/h6viz.gif" alt="" />
                </div>
              ) : (
                this.state.posts.map((element, i) => {
                  return (
                    <Posts
                      user={this.state.username}
                      delPost={this.deletePost}
                      editPost={this.editPost}
                      post={element}
                      key={i}
                    />
                  );
                })
              )}

              <Modal
                onchange={(e) =>
                  this.setState(
                    { postsText: e.target.value },
                    console.log(this.state.postsText)
                  )
                }
                name={this.state.user.name}
                handleClose={() => {
                  this.setState({ showModal: false });
                  this.postData();
                }}
                show={this.state.showModal}
                file={(event) => {
                  console.log(event.target.files[0]);
                  const formData = new FormData();
                  formData.append("image", event.target.files[0]);
                  console.log(formData);
                  this.setState({ inputFile: formData });
                }}
              />
            </Col>
            <Col lg={3} style={{ paddingLeft: "0px" }}>
              <NewsFeedRightSidebar />
            </Col>
          </Row>
        </Container>
        <MessageBar />
      </>
    );
  }
}
