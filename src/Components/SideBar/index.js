import React from "react";
import { Link } from "react-router-dom";
import { NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import { Wrapper } from "./style";
import logo from "./../../Assets/Image/Profile/Logo.png";

const SideBar = (props) => {
  return (
    <Wrapper>
      <div className={`left ${props.isOpen ? "active" : ""}`}>
        <Nav vertical id="sidebar" className="min-vh-100 shadow">
          <div className="content">
            <NavbarBrand className="my-5 d-flex flex-column align-items-center">
              <img src={logo} className="sidebar-brand" alt="Logo EViteU" />
            </NavbarBrand>
            <NavItem className="mt-2">
              <NavLink
                className={`text-white sidebar-menu p-3 ${
                  props.page === "event-list" ? "active" : ""
                }`}
                to="event-list"
                tag={Link}
              >
                Event
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={` sidebar-menu p-3 ${
                  props.page === "guest-list" ? "active" : ""
                }`}
                to="guest-list"
                tag={Link}
              >
                Guest
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={` sidebar-menu p-3 ${
                  props.page === "committee-list" ? "active" : ""
                }`}
                to="committee-list"
                tag={Link}
              >
                Committee
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={` sidebar-menu p-3 ${
                  props.page === "annuncement-list" ? "active" : ""
                }`}
                to="annuncement-list"
                tag={Link}
              >
                Announcement
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={` sidebar-menu p-3 ${
                  props.page === "lottery" ? "active" : ""
                }`}
                to="lottery"
                tag={Link}
              >
                Lottery
              </NavLink>
            </NavItem>
            <div className="wrapper-sidebar-logout mt-5">
              <Button
                className="btn-indigo sidebar-logout"
                onClick={() => {
                  props.handleLogOut();
                }}
              >
                Log Out
              </Button>
            </div>
          </div>
        </Nav>
      </div>
    </Wrapper>
  );
};

export default SideBar;
