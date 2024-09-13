import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClients from "../lib/apiRequest";

const Register = () => {
  const [userData, setUserDate] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await apiClients.apiBaseUrl.post(
        "/users/register",
        userData
      );
      const newUser = await response.data;
      if (!newUser) {
        setError("Couldn't register user. Please try again.");
      }
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      setError(error.response?.data.message);
    }
  };

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form" onSubmit={registerUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input
            type="text"
            placeholder="Full name"
            name="name"
            value={userData.name}
            onChange={(e) => setUserDate({ ...userData, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={userData.email}
            onChange={(e) =>
              setUserDate({ ...userData, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={(e) =>
              setUserDate({ ...userData, password: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password Again"
            name="password2"
            value={userData.password2}
            onChange={(e) =>
              setUserDate({ ...userData, password2: e.target.value })
            }
          />
          <button className="btn primary">Register</button>
        </form>
        <small>
          Already have an account <Link to="/login">Sign in</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
