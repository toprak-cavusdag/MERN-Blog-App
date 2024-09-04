import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [userData, setUserDate] = useState({
    name: "",
    email: "",
    password: "",
  });
  return (
    <section className="login">
      <div className="container">
        <h2>Login</h2>
        <form className="form login__form">
          <p className="form__error-message">This is an error message</p>
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
            name="password1"
            value={userData.password}
            onChange={(e) =>
              setUserDate({ ...userData, password: e.target.value })
            }
          />
          <button className="btn primary">Login</button>
        </form>
        <small>
          Don't have an account? <Link to="/register">Sign up</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
