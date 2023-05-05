// import { Astaric } from "../../HemeIconLibrary";
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import hematogenix from '../../assets/images/Hematogenix.svg';

const HemaNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[70px] hema-navbar fixed w-full top-0 left-0 z-[4]">
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={hematogenix} alt="" />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};
export default HemaNavbar;
