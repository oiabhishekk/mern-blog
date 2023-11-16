import React from "react";
import "./App.css";
import Post from "./components/Post";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./Pages/IndexPage";
import Login from "./Pages/Login";
import RegisterPage from "./Pages/RegisterPage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default App;
