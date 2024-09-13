import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import apiClients from "../lib/apiRequest";

const Login = () => {
  const [userData, setUserDate] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await apiClients.apiBaseUrl.post(
        "/users/login/",
        userData
      );
      const user = await response.data;
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      setError(error.response?.data.message); //HttpError messages
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h2>Login</h2>
        <form className="form login__form" onSubmit={loginUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={userData.email}
            onChange={(e) =>
              setUserDate({ ...userData, email: e.target.value })
            }
            autoFocus
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
