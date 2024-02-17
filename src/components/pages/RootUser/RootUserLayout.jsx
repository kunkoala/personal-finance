import React from "react";
import { Outlet } from "react-router-dom";
import NavbarBrand from "../../layout/NavbarBrand";
import NavScrollExample from "../../layout/NavbarScroll";
import Footer from "../../layout/Footer";

// here i use rootuserlayout to wrap the routes based on the course,
// so that the user can only access this routes if they are logged in
// and have the role of root user

function RootUserLayout() {
  return (
    <div>
      <NavScrollExample />
      <Outlet />
      <Footer />
    </div>
  );
}

export default RootUserLayout;
