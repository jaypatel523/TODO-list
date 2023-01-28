import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
const Register = () => {
  const navigateTo = useNavigate();

  // for register
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    // console.log(user);
    axios.post("http://localhost:5001/api/v1/register", user).then((res) => {
      if (res.data.newUser) {
        navigateTo("/login");
      } else {
        setUser({
          username: "",
          email: "",
          password: "",
        });
      }
      console.log(res.data);
      alert(res.data.msg);
    });
  };

  return (
    <>
      <div className="w-2/5 m-auto">
        <h1 className="my-5 font-bold text-2xl"> Register </h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border">
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </div>
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
              value={user.password}
              onChange={handleChange}
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-evenly">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={register}
            >
              Submit{" "}
            </button>

            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                navigateTo("/login");
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>

      {/* after register part */}
    </>
  );
};

export default Register;
