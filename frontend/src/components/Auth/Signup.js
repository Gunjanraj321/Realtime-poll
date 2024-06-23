import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated, setEmail, setToken, setUserId } from "../Redux/AuthSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/signup",
        formData
      );

      const token = response.data.token;
      const email = response.data.email;
      const userId = response.data.id;

      dispatch(setAuthenticated(true));
      dispatch(setToken(token));
      dispatch(setEmail(email));
      dispatch(setUserId(userId));

      alert(response.data.message || "Signup successful!");
      navigate("/header");
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error(
        "Error occurred during signup:",
        typeof error === "function" ? error.toString() : error
      );
    }
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="p-8 shadow-lg rounded-xl text-center bg-white">
          <h1 className="text-3xl font-bold text-cyan-500 pb-3">
            Create an account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                name="username"
                className="p-2 rounded-lg bg-gray-100 shadow-md focus:outline-none focus:border-2 border-cyan-500"
                placeholder="Emelia Erickson"
                required
                value={formData.username}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                className="p-2 rounded-lg bg-gray-100 shadow-md focus:outline-none focus:border-2 border-cyan-500"
                placeholder="emelia_erickson24@gmail.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="p-2 rounded-lg bg-gray-100 shadow-md focus:outline-none focus:border-2 border-cyan-500"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Link to="/Login" className="text-sm text-cyan-600 underline mt-4 block">
              Already Have Account : Login
            </Link>
            <button
              type="submit"
              className="bg-cyan-200 p-2 text-gray-800 font-semibold rounded-xl border-cyan-700 focus:ring-2 mt-4"
            >
              Create an account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
