import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./NavbarScroll.module.css";

function NavScrollExample() {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
    { label: "Dashboard", path: "/dashboard" },
  ];
  return (
    <Navbar expand="lg" className={styles.navbar} data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={require("../common/img/logo512.png")}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          BaeAku Financial
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav style={{ maxHeight: "100px" }} navbarScroll className="navbar">
            {navItems.map((item, index) => (
              <Nav.Link
                key={index}
                as={NavLink}
                to={item.path}
                className={styles.navlink}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navlink} ${styles.activeNavlink}`
                      : styles.navlink
                  }
                >
                  {item.label}
                </NavLink>
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
