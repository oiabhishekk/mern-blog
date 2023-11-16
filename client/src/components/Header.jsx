import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../Context/UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(userContext);
  useEffect(() => {
    console.log(document.cookie);
    fetch("http://127.0.0.1:3000/profile", {
      method: "GET",
      credentials: "include",
    }).then((res) =>
      res.json().then((parsedres) => {
        setUserInfo(parsedres);
      })
    );
  }, [logout]);

  function logout() {
    fetch("http://127.0.0.1:3000/logout", {
      method: "POST",
      credentials: "include",
    });
    
    setUserInfo(null);
  }
  const UserName = userInfo?.UserName;

  return (
    <div>
      <header>
        <NavLink to="/" className="logo">
          MyBlog
        </NavLink>
        {UserName && (
          <nav>
            <Link to="/create">Create New Post </Link>
            <a onClick={logout}>Logout</a>
          </nav>
        )}
        {!UserName && (
          <nav>
            <Link to="/login">Login </Link>
            <Link to="/register">Register</Link>
          </nav>
        )}
      </header>
    </div>
  );
};

export default Header;
