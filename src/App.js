import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./components/Profile/Profile";
import Signin from "./components/SignIn";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyNetwork from "./components/Network/MyNetwork";
import ExperienceSubmitionForm from "./components/Network/ExperienceSubmitionForm";
import Homepage from "./components/Homepage/FeedPage";
import { connect } from "react-redux";
import MessageBar from "./components/messaging/MessageBar.jsx";
import io from "socket.io-client";

const mapStateToProps = (state) => state;
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msgs: [],
      users: [],
      username: "",
    };
  }

  render() {
    return (
      <>
        <Router>
          <Switch>
            {/* <Route path='/feed/:id' component={Homepage}/> */}
            <Route exact path="/" component={Signin} />
            <Route path="/feed" component={Homepage} />
            {/*  {this.props.loggedIn && (
              <Route
                path="/"
                render={() => (
                  <MessageBar
                    liveConnections={this.state.users}
                    sendMessageFn={this.sendMessage}
                    msgs={this.state.msgs}
                  />
                )}
              />
            )} */}

            <Route path="/user/me" component={Profile} />
            <Route path="/myNetwork" component={MyNetwork} />
            <Route path="/SignUp" component={SignUp} />
            <Route
              exact
              path="/addExperience"
              component={ExperienceSubmitionForm}
            />
          </Switch>
        </Router>
      </>
    );
  }
}

export default connect(mapStateToProps)(App);
