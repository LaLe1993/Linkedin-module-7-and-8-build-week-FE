import React, { Component } from "react";
import { Container, Row, Col, ListGroup, Form } from "react-bootstrap";
import { BsQuestionCircle } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";

export default class footer extends Component {
  render() {
    return (
      <Container fluid className="footer my-5">
        <Row>
          <Col lg={2} className="logo">
            <img
              className="img-fluid"
              src="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo-2003%E2%80%932011.png"
              alt=""
            />
          </Col>
        </Row>
        <Row>
          <Col lg={2}>
            <ListGroup>
              <ListGroup.Item>
                <a>About</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a>Community Guidelines</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a>Privacy & Terms</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a>Sales Solutions</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a>Safety Center</a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={2}>
            <ListGroup>
              <ListGroup.Item>
                <a>Accessibility</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a>Career</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a>Ad Choices</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a>Mobile</a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={2}>
            <ListGroup>
              <ListGroup.Item>
                <a>Talent Solutions</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a>Marketing Solutions</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a>Advertising</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a>Small Business</a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={3} className="quest">
            <div className="d-flex mt-2">
              <BsQuestionCircle
                style={{ color: "#0073b1", fontSize: "2em" }}
              />
              <div>
                <a className="m-0 pl-2" style={{ fontSize: "0.7em" }}>
                  Questions ?
                </a>
                <p className="m-0 pl-2" style={{ fontSize: "0.6em" }}>
                  Visit our Help center
                </p>
              </div>
            </div>
            <div className="d-flex mt-2">
              <FiSettings style={{ color: "#0073b1", fontSize: "2em" }} />
              <div>
                <a className="m-0 pl-2" style={{ fontSize: "0.7em" }}>
                  Manage your account and privatcy ?
                </a>
                <p className="m-0 pl-2" style={{ fontSize: "0.6em" }}>
                  Visit our Help center
                </p>
              </div>
            </div>
          </Col>
          <Col lg={3}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Select Language</Form.Label>
              <Form.Control size="sm" as="select">
                <option>English</option>
                <option>Albanian</option>
                <option>Chinese</option>
                <option>Italian</option>
                <option>Spanish</option>
                <option>Serbian</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    );
  }
}
