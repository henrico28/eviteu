import React from "react";
import { NavBar, Footer } from "../../Components";

const Layout = (props) => {
  return (
    <React.Fragment>
      <NavBar />
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
