import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [userData, setUserDate] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form">
          <p className="form__error-message">This is an error message</p>
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
            onChange={(e) => setUserDate({ ...userData, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            name="password1"
            value={userData.password1}
            onChange={(e) =>
              setUserDate({ ...userData, password1: e.target.value })
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
