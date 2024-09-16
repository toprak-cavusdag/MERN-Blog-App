import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClients from "../lib/apiRequest";

const PostAuthor = ({ authorID, createAt }) => {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await apiClients.apiBaseUrl.get(`/users/${authorID}`);
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, []);

  return (
    <Link to={"/posts/users/kfwkegjw"} className="post__author">
      <div className="post__author-avatar">
        <img
          src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${author?.avatar}`}
          alt=""
        />
      </div>
      <div className="post__author-details">
        <h5>By: Erbest Achiever</h5>
        <small>Just Now</small>
      </div>
    </Link>
  );
};

export default PostAuthor;
