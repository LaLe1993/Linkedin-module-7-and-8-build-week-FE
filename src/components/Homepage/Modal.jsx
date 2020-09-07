import React, { Component } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import "../../styles/HomePage.css";
export default class postModal extends Component {
  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.handleClose}
          animation={true}
        >
          <Modal.Header closeButton>
            <h5>Create a post</h5>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col className="d-flex">
                  <img
                    className="img-fluid mod"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png"
                    alt=""
                  />
                  <div>
                    <p className="ml-2 mt-2">{this.props.name}</p>
                  </div>
                </Col>
              </Row>
              <Row className="mt-2">
                <Form.Control
                  onChange={this.props.onchange}
                  as="textarea"
                  rows="5"
                />
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Form>
              <Form.Group>
                <Form.File
                  id="image"
                  label="image"
                  onChange={this.props.file}
                  name="image"
                />
              </Form.Group>
            </Form>
            <Button variant="primary" onClick={this.props.handleClose}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
