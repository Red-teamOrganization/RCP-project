import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h3>
        <Link to="/">RCP</Link>
      </h3>
      <div>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
