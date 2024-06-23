import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated, setEmail, setToken, setUserId } from "../Redux/AuthSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        formData
      );
      const { token, email, id } = response.data;
      dispatch(setAuthenticated(true));
      dispatch(setToken(token));
      dispatch(setEmail(email));
      dispatch(setUserId(id));

      navigate("/header");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password."); 
      } else {
        alert("An error occurred. Please try again later."); 
      }
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="p-8 shadow-lg rounded-xl text-center bg-white">
          <h1 className="text-3xl py-3 font-bold text-cyan-500">Log In</h1>
          <form className="text-left pt-3" onSubmit={handleSubmit}>
            <input
              className="p-1 rounded-lg bg-gray-100 shadow-md focus:outline-none focus:border-2 border-cyan-500"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="block p-1 mt-3 rounded-lg bg-gray-100 shadow-md focus:outline-none focus:border-2 border-cyan-500"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              className="bg-cyan-200 p-2 pr-5 pl-5 text-gray-800 font-semibold rounded-xl border-cyan-700 focus:ring-2 m-4"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
