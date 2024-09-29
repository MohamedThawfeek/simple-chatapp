import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import axios from "../../service/axios";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      const { data } = await axios.post("/signup", {
        email,
        password,
      });

      if (data.success) {
        setSpinner(false);
        localStorage.setItem("token", data.token);
        navigate("/");
        return;
      }
    } catch (error) {
      setSpinner(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="container-box ">
        <h1 className="title-text ">Sign-Up</h1>
        <form onSubmit={handleLogin} className="form">
          <div className="input-container">
            <label>Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              name="password"
              type={show ? "text" : "password"}
              required
              placeholder="Enter your password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {show ? (
              <FaEye
                size={20}
                onClick={() => setShow(false)}
                className="password-icons"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setShow(true)}
                size={20}
                className="password-icons"
              />
            )}
          </div>
          {spinner ? (
            <button type="button" className="button">
              <ClipLoader size={18} />
            </button>
          ) : (
            <button type="submit" className="button">
              Signup
            </button>
          )}
        </form>
        <Link to="/login">Login</Link>

      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Signup;
