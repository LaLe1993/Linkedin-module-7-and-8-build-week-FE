import React, { Component } from "react";
import {
  Container,
  Form,
  Button,
  FormControl,
  InputGroup,
  Col,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormRow } from "react-bootstrap/Form";
import { withRouter } from "react-router-dom";

const schema = Yup.object({
  role: Yup.string()
    .required("Required")
    .min(3, "Minimum 3 characters required"),
  company: Yup.string()
    .required("Required")
    .min(2, "Minimum 2 characters required"),
  startDate: Yup.string().required("Required"),
  endDate: Yup.string(),
  description: Yup.string().required("Required"),
  area: Yup.string().required("Required"),
});

class LinkedInForm extends React.Component {
  state = {
    hide: true,
    data: [],
  };
  componentDidMount = () => {
    console.log(this.props);
  };
  sendData = async (values) => {
    let response = await fetch(
      "https://be-linkedin.herokuapp.com/profile/user1/experience",
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: new Headers({
          Authorization: "Basic " + btoa("user26:Q2h7j3FtxhdxMdab"),
          "Content-type": "application/json",
        }),
      }
    );
    if (response.ok) {
      alert("Submitted");
      this.props.history.push("/profile/user1");
    }
  };
  render() {
    return (
      <div className="formOuterContainer">
        <Container className="form mb-3">
          <p className="display-4 text-center">Add new experience</p>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              this.setState({ data: values });
              this.sendData(values);
              // console.log(values);
            }}
            initialValues={{
              role: "",
              company: "",
              startDate: "",
              endDate: "",
              description: "",
              area: "",
            }}
          >
            {({
              handleSubmit,
              handleBlur,
              handleChange,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      type="text"
                      role="role"
                      value={values.role}
                      onChange={handleChange}
                      isValid={touched.role && !errors.role}
                      isInvalid={errors.role}
                      placeholder="Role*"
                    />
                    <Form.Control.Feedback type="valid" tooltip>
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.role}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="company">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      name="company"
                      value={values.company}
                      onChange={handleChange}
                      isValid={touched.company && !errors.company}
                      isInvalid={errors.company}
                      placeholder="Company*"
                    />
                    <Form.Control.Feedback type="valid" tooltip>
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.company}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="startDate">
                    <Form.Label>StartDate</Form.Label>
                    <Form.Control
                      type="text"
                      name="startDate"
                      placeholder="StartDate*"
                      value={values.startDate}
                      onChange={handleChange}
                      isValid={touched.startDate && !errors.startDate}
                      isInvalid={errors.startDate}
                    />
                    <Form.Control.Feedback type="valid" tooltip>
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.startDate}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="endDate">
                    <Form.Label>EndDate</Form.Label>
                    <Form.Control
                      type="text"
                      name="endDate"
                      placeholder="EndDate"
                      value={values.endDate}
                      onChange={handleChange}
                      isValid={touched.endDate && !errors.endDate}
                      isInvalid={errors.endDate}
                    />
                    <Form.Control.Feedback type="valid" tooltip>
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.endDate}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={4} controlId="area">
                    <Form.Label>Area</Form.Label>
                    <Form.Control
                      type="text"
                      name="area"
                      placeholder="Your Area*"
                      value={values.area}
                      onChange={handleChange}
                      isValid={touched.area && !errors.area}
                      isInvalid={errors.area}
                    />
                    <Form.Control.Feedback type="valid" tooltip>
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.area}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="12" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      placeholder="Description*"
                      value={values.description}
                      onChange={handleChange}
                      isValid={touched.description && !errors.description}
                      isInvalid={errors.description}
                    />
                    <Form.Control.Feedback type="valid" tooltip>
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                <Button
                  //className="submitBtn"
                  variant="outline-light"
                  // type="submit"
                >
                  Save
                </Button>
                <Button type="submit">Save</Button>
                {console.log(errors)}
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    );
  }
}
export default withRouter(LinkedInForm);
