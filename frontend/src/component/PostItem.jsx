import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostItem = ({ postID, category, title, desc, authorID, thumbnail }) => {
    const shortDescription = desc.length > 145 ? desc.substr(0, 145) + "..." : desc
    const shortTitle = title.length > 35 ? desc.substr(0, 35) + "..." : title
  return (
    <Link to={`/posts/${postID}`} className="post">
      <div className="post__thumbnail">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="post__content">
          <h3>{shortTitle}</h3>
        <p>{shortDescription}</p>
        <div className="post__footer">
          <PostAuthor />
          <Link className="btn category" to={`/posts/categories/${category}`}>{category}</Link>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
