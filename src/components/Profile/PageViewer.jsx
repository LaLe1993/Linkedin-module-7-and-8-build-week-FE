import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const PageViewer = (data) => {
  return (
    <li className="mb-2">
      <Row>
        <Col className="col-3">
          {data.data.image ? (
            <Image
              src={`data:image/jpeg;base64,${data.data.image}`}
              style={{
                width: "100%",
                height: "80%",
                borderRadius: 30 + "px",
                overflow: "hidden",
              }}
              alt="User's picture"
            />
          ) : (
            <Image
              src="https://capenetworks.com/static/images/testimonials/user-icon.svg"
              style={{
                width: "100%",
                borderRadius: 30 + "px",
                overflow: "hidden",
              }}
              alt="User's picture"
            />
          )}
        </Col>
        <Col className="col-7 d-flex flex-column">
          {/* {if (data.data.username === user7){
                        console.log("same user")
                    }else{
                        
                    }} */}
          <Link className="nav-link" to={"/profile/" + data.data.username}>
            {data.data.name + " " + data.data.surname}
          </Link>
          <span>{data.data.title}</span>
        </Col>
        <Col className="col-2">
          <FaUserPlus style={{ fontSize: 1.6 + "rem" }} />
        </Col>
      </Row>
      <hr />
    </li>
  );
};

export default PageViewer;
