import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClients from "../lib/apiRequest";
import ReactTimeAgo from "react-time-ago"
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en"

TimeAgo.addLocale(en)
TimeAgo.addDefaultLocale(en)


const PostAuthor = ({ authorID, createdAt }) => {
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
    <Link to={`/posts/users/${authorID}`} className="post__author">
      <div className="post__author-avatar">
        <img
          src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${author?.avatar}`}
          alt=""
        />
      </div>
      <div className="post__author-details">
        <h5>By:{" "} {author?.name}</h5>
        <small><ReactTimeAgo date={new Date(createdAt)} locale="en-US" /></small> 
      </div>
    </Link>
  );
};

export default PostAuthor;
