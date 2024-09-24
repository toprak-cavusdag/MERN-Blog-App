import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { UserContext } from "../context/userContext";
import apiClients from "../lib/apiRequest";

const UserProfile = () => {
  const [avatar, setAvatar] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  const changeAvatarHandle = async () => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await apiClients.apiBaseUrl.post(
        "users/change-avatar",
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setAvatar(response?.data.avatar);
    } catch (error) {
      setError(error);
    }
  };

  const getUserValueHandle = async () => {
    const response = await apiClients.apiBaseUrl.get(
      `/users/${currentUser.id}`,
      { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
    );

    const { name, email, avatar } = response.data;
    setName(name);
    setEmail(email);
    setAvatar(avatar);
  };

  const updateUserDetailsHandle = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name,
        email,
        currentPassword,
        newPassword,
        confirmNewPassword
      };

      const response = await apiClients.apiBaseUrl.patch(
        "/users/edit-user",
        JSON.stringify(userData), // JSON formatında gönder
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" // JSON gönderimi için doğru içerik tipi
          },
        }
      );

      if (response.status == 200) {
        //Log user Out
        navigate("/logout");
      }
    } catch (error) {
      setError(error.response?.data.message)
    }
  };

  //Redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    getUserValueHandle();
  }, []);

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser.id}`} className="btn">
          My Posts
        </Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img
                src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${avatar}`}
                alt="User Avatar"
              />
            </div>
            {/* Form to update Avatar */}
            <form className="avatar__form">
              <input
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
                name="avatar"
                id="avatar"
                accept="image/*"
                />
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}>
                <BiEdit />
              </label>
            </form>
            {isAvatarTouched && (
              <button
                className="profile__avatar-btn"
                onClick={changeAvatarHandle}
              >
                <FaCheck />
              </button>
            )}
          </div>
          <h1>{currentUser?.name}</h1>

          {/* Form to update user details */}
          <form className="form profile__form" onSubmit={updateUserDetailsHandle}>
            {error && <p className="form__error-message">{error}</p>}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password (write again)"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button className="btn primary" type="submit">
              Update Details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
