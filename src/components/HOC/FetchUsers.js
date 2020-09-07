import React from "react";
import axios from "axios";

function userData(WrappedComponent) {
  return class PP extends React.Component {
    state = {
      users: [],
    };
    componentDidMount() {
      this.fetchUsers();
    }
    async fetchUsers() {
      let usersData = {
        method: "GET",
        url: `https://be-linkedin.herokuapp.com/profile`,
        headers: {
          Authorization: "Basic " + btoa("user7:3UU5dYFvenRuRP7E"),
        },
      };
      let users = await axios(usersData);
      this.setState({ users: users.data }, () => console.log(this.state.users));
    }
    render() {
      return <WrappedComponent users={this.state.users} />;
    }
  };
}
export default userData;
