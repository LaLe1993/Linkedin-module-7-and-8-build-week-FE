import React from "react";
import { UncontrolledCollapse, Button } from "reactstrap";
import { Row, Col } from "react-bootstrap";
import { FaHashtag } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";
import {IconContext} from 'react-icons';
import {BsChevronCompactDown} from 'react-icons/bs'
import { Link } from "react-router-dom";
import { GoTriangleLeft } from "react-icons/go";
import '../../styles/HomePage.css'


const Leftsidebar = () => (
  <div className="leftSidebar mt-2 home leftSidebarShadow">
    <div>
      <Row className="mr-auto d-flex flex-row ">
        <Col xs={10} className="pl-4 mt-2 left" >
          Recent
        </Col>{" "}
        <Col xs={2}>
          {" "}
          <p
            id="toggler"
            className="mt-0 tog1"
            text="hello"
            >
            <IconContext.Provider value={{className:'icons'}}>
              <BsChevronCompactDown />
            </IconContext.Provider>
          </p>
        </Col>
      </Row>
      <UncontrolledCollapse
        toggler="#toggler"
        className="al"
             >
        <p className='d-flex align-items-center p4'>
          <FaHashtag />
          REACT
        </p>
        <p className='d-flex align-items-center p4'>
          <FaHashtag />
          JAVASCRIPT
        </p>
      </UncontrolledCollapse>
    </div>
    <div className="">
      <Row className="mr-auto d-flex flex-row">
        <Col xs={10} className="pl-4 pt-2 left" >
          Groups
        </Col>{" "}
        <Col xs={2}>
          {" "}
          <div
            className="pt-o d-flex tog2"
            id="toggler1">
            <IconContext.Provider value={{className:'icons'}}>
              <p><BsChevronCompactDown /></p>
            </IconContext.Provider>
          </div>
        </Col>
      </Row>
      <UncontrolledCollapse
        toggler="#toggler1"
       className="al"
      >
        <p className='d-flex align-items-center'>
          <GrGroup className="mr-2 p4" />
          Join Groups
        </p>
      </UncontrolledCollapse>
    </div>
    <div className="">
      <Row className="mr-auto d-flex flex-row">
        <Col xs={10} className="pl-4 left" >
          Events
        </Col>{" "}
        <Col xs={2}>
          <FaPlus />{" "}
        </Col>
      </Row>
    </div>
    <div>
      <Link to="/">
        <div
          className="pl-2 pt-2 border-bottom lin">
          Followed Hashtags
        </div>
      </Link>
    </div>
    <div className="pt-2">
      <Col className="pl-4 pb-2 p4" style={{ textAlign: "center" }}>
        Discover more
      </Col>
    </div>
  </div>
);

export default Leftsidebar;
