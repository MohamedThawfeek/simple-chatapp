import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from "../../service/axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      const { data } = await axios.post("/login", {
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
        <h1 className="title-text ">Login</h1>
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
              Login
            </button>
          )}
        </form>

        <Link to="/signup">Signup</Link>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Login;
