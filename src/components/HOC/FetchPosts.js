import React from "react";
import axios from "axios";

function postsData(WrappedComponent) {
  return class PP extends React.Component {
    state = {
      posts: [],
    };
    componentDidMount() {
      this.fetchPosts();
    }
    bufferToBase64(buf) {
      var binstr = Array.prototype.map
        .call(buf, function (ch) {
          return String.fromCharCode(ch);
        })
        .join("");
      return btoa(binstr);
    }
    async fetchPosts() {
      let postsData = {
        method: "GET",
        //url: `https://striveschool.herokuapp.com/api/posts/`,
        url: `https://be-linkedin.herokuapp.com/posts`,
        headers: {
          Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
        },
      };
      let posts = await axios(postsData);
      let allPosts = posts.data;
      allPosts.forEach((post) => {
        const base64 = this.bufferToBase64(post.user.image.data);
        post.user.image = base64;
      });
      // console.log(allPosts);
      this.setState({ posts: allPosts.reverse().slice(0, 20) });
    }
    render() {
      return <WrappedComponent posts={this.state.posts} />;
    }
  };
}
export default postsData;
