import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../assets/avatar15.jpg";
import { BiEdit } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/pfelelwpg`} className="btn">
          My Posts
        </Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={avatar} alt="User Avatar" />
            </div>
            {/* Form to update Avatar */}
            <form className="avatar__form">
              <input
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
                name="avatar"
                id="avatar"
                accept="png, jpg, jpeg, webp"
              />
              <label htmlFor="avatar">
                <BiEdit />
              </label>
            </form>
            <button className="profile__avatar-btn">
              <FaCheck />
            </button>
          </div>
          <h1>Ernest Achiever</h1>

          {/* Form to update user details */}
          <form className="form profile__form">
            <p className="form__error-message">This is an error message</p>
            <input type="text" placeholder="Full Name"value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Email"value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Current Password"value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            <input type="password" placeholder="New Password"value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password (write again)"value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <button className="btn primary" type="submit">Update Details</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
