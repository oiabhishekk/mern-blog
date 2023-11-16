import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import App from "../App";
import { userContext } from "../Context/UserContext";

const Login = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(userContext);
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://127.0.0.1:3000/login", {
      method: "POST",
      body: JSON.stringify({ UserName, Password }),
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => setUserInfo(userInfo));
      setRedirect("true");
    } else {
      alert("Wrong credentials");
    }
  }
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={UserName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
