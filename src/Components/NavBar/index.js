import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Wrapper } from "./style";

import logo from "./../../Assets/Image/Profile/Logo.png";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper>
      <div className="wrapper-navbar shadow">
        <Navbar color="faded" light expand="md">
          <NavbarBrand tag={Link} to="/">
            <img src={logo} alt="Logo EViteU" />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto mt-1" navbar>
              <NavItem className="mx-2">
                <NavLink className="navbar-menu" href="signup">
                  Sign Up
                </NavLink>
              </NavItem>
              <NavItem className="mx-2">
                <NavLink className="navbar-menu" href="login">
                  Log In
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </Wrapper>
  );
};

export default NavBar;
