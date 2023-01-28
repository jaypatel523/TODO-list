import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
  const nevigateTo = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    // console.log(userlogin);
    setIsLoading(true);
    axios.post("http://localhost:5001/api/v1/login", user).then((res) => {
      if (res.data.user) {
        setUser(res.data.user);
        nevigateTo("/");
      } else {
        setUser({
          email: "",
          password: "",
        });
      }
      setIsLoading(false);
      alert(res.data.msg);
    });
  };

  return (
    <>
      {isLoading ? (
        <>
          <h1 className="text-2xl">Loading...</h1>
        </>
      ) : (
        <div className="w-2/5 m-auto">
          <h1 className="my-5 font-bold text-2xl"> Login </h1>
          <form className="bg-white shadow-md rounded p-10 mb-4 border">
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <div className="mb-6 flex justify-evenly">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={login}
              >
                Submit{" "}
              </button>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                  nevigateTo("/register");
                }}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
