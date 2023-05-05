// import { Astaric } from "../../HemeIconLibrary";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import hematogenix from "../../assets/images/Hematogenix.svg";
import flag from "../../assets/images/flag.svg";
import Profile from "../../assets/images/Profile.svg";
import { InfoAlert, Message, Notification, Logout } from "../../HemeIconLibrary";
const HemaNavbar = () => {
  const navigate=useNavigate()
  return (
    <div className="h-[70px] hema-navbar fixed w-full top-0 left-0 z-[4]">
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={hematogenix} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="my-2 me-auto my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <div className="items-center d-flex">
                {/* <div className="d-flex mr-[20px]">
                  <p className="font-semibold text-white text-[13px] mb-0 mr-[11px]">English</p>
                  <img src={flag} alt="" width="25" />
                </div> */}
                {/* <Nav.Link className="d-flex justify-center items-center mr-[20px] bg-white rounded-[90px] relative w-[36px] h-[36px]">
                  <Message />
                  <p className=" absolute right-[0px] top-[0px] bg-tableOrangeColor rounded-[90px]  d-flex  justify-center items-center w-[16px] h-[16px] font-medium text-white text-[12px]">
                    5
                  </p>
                </Nav.Link>
                <Nav.Link className="d-flex justify-center items-center mr-[20px] bg-white rounded-[90px] relative w-[36px] h-[36px]">
                  <Notification />
                  <p className=" absolute right-[-0px] top-[0px] bg-tableOrangeColor rounded-[90px]  d-flex  justify-center items-center w-[16px] h-[16px] font-medium text-white text-[12px]">
                    5
                  </p>
                </Nav.Link> */}
                <NavDropdown
                  className="items-center justify-center p-0 rounded-full d-flex w-9 h-9 user-dropdown"
                  title={
                    <div className="flex items-center justify-center w-full h-full p-0">
                      <img src={Profile} alt="" width="25" className="w-full" />
                    </div>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    className="user-down-item"
                    href=""
                    onClick={() => {
                      localStorage.removeItem("hema-token");
                      localStorage.removeItem("hema-token-refresh");
                      navigate('/login')
                    }}
                  >
                    <div className="flex items-center w-auto gap-2 ">
                      <Logout />
                      <span className="text-base font-semibold">Logout</span>
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default HemaNavbar;
