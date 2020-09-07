import React from "react";
import { Col, Image } from "react-bootstrap";
import { FaQuestionCircle } from "react-icons/fa";
import PageViewer from "./PageViewer";

class SideBar extends React.Component {
  state = {
    data: [],
    mainUser: "user1",
  };
  bufferToBase64(buf) {
    var binstr = Array.prototype.map
      .call(buf, function (ch) {
        return String.fromCharCode(ch);
      })
      .join("");
    return btoa(binstr);
  }
  componentDidMount = async () => {
    let response = await fetch(`https://be-linkedin.herokuapp.com/profile`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic dXNlcjE4OlEyejVWN2hFRlU2SktSckU=",
        "Content-type": "application/json",
      }),
    });
    let parsedJson = await response.json();
    parsedJson.forEach((element) => {
      const base64 = this.bufferToBase64(element.image.data);
      element.image = base64;
    });
    let filteredArray = parsedJson.filter(
      (element) => element.username !== this.state.mainUser
    );
    console.log(parsedJson);
    this.setState({ data: filteredArray });
  };

  render() {
    console.log(this.state.data.slice(0, 6));
    return (
      <Col className="col-4 sideBar">
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <span>Edit public profile & URL</span>
            <FaQuestionCircle />
          </div>
          <hr className="my-4" />
          <div className="d-flex justify-content-between align-items-center">
            <span>Add profile in another language</span>
            <FaQuestionCircle />
          </div>
        </div>
        <div className="banerContainer">
          <Image
            src="https://blog.academyoflearning.com/wp-content/uploads/2017/09/linkedin-gif.gif"
            style={{ width: 100 + "%" }}
          />
        </div>
        <div className="mt-4">
          <h2>People Also Viewed</h2>
          <ul>
            {this.state.data.slice(0, 10).map(function (data, i) {
              return <PageViewer data={data} key={i} />;
            })}
          </ul>
        </div>
      </Col>
    );
  }
}

export default SideBar;
