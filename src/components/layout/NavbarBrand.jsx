import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavbarBrand() {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                alt=""
                src={require("../common/img/logo512.png")}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              BaeAku Financial
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarBrand;
