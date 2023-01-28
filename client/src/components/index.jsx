import React, { useContext } from "react";
import Login from "./login";
import Register from "./register";
import Home from "./home";
import TODO from "./todo_db";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../UserContext";

const Main = () => {
  // console.log(userLogin);
  const { user } = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={user && user._id ? <TODO /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Main;
