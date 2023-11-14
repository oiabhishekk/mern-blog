import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header>
        <NavLink to="/" className="logo">
          MyBlog
        </NavLink>
        <nav>
          <Link to="/login">Login </Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;
