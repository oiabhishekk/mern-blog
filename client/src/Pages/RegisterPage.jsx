import React, { useState } from "react";

const RegisterPage = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:3000/register", {
      method: "POST",
      body: JSON.stringify({ UserName, Password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("REGISTRATION SUCCESSFULL");
    } else {
      alert("REGISTRATION FAILED");
    }
  };
  return (
    <>
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
      </form>
    </>
  );
};

export default RegisterPage;
