import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo">
          <img src={Logo} alt="Navbar Logo" />
        </Link>
        <ul className="nav__menu">
          <li>
            <Link to="/profile">Ernest Achiever</Link>
          </li>
          <li>
            <Link to="/create">Create Post</Link>
          </li>
          <li>
            <Link to="/authors">Authors</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
        <button className="nav__toggle-btn">
        <IoMdClose />
        </button>
      </div>
    </nav>
  );
};

export default Header;
