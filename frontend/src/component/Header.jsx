import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { IoMdClose } from "react-icons/io";
import { FaBars } from "react-icons/fa6";

const Header = () => {
  const [isActive, setIsActive] = useState(
    window.innerWidth > 800 ? true : false
  );

  const navCloseHandler = () => {
    if (window.innerWidth < 800) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo">
          <img src={Logo} alt="Navbar Logo" />
        </Link>
        {isActive && (
          <ul className="nav__menu">
            <li>
              <Link onClick={navCloseHandler} to="/profile">
                Ernest Achiever
              </Link>
            </li>
            <li>
              <Link onClick={navCloseHandler} to="/create">
                Create Post
              </Link>
            </li>
            <li>
              <Link onClick={navCloseHandler} to="/authors">
                Authors
              </Link>
            </li>
            <li>
              <Link onClick={navCloseHandler} to="/logout">
                Logout
              </Link>
            </li>
          </ul>
        )}
        <button
          className="nav__toggle-btn"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? <IoMdClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
