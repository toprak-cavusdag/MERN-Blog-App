import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostItem = ({
  postID,
  category,
  title,
  desc,
  authorID,
  thumbnail,
  createdAt,
}) => {
  const shortDescription =
    desc.length > 145 ? desc.substr(0, 145) + "..." : desc;
  const shortTitle = title.length > 35 ? desc.substr(0, 35) + "..." : title;
  const navigate = useNavigate();

  return (
    <article className="post">
      <div onClick={() => navigate(`/posts/${postID}`)} className="post__thumbnail">
        <img
          src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${thumbnail}`}
          alt={title}
        />
      </div>
      <div className="post__content">
        <h3 dangerouslySetInnerHTML={{__html: shortTitle}} onClick={() => navigate(`/posts/${postID}`)} />
        <p dangerouslySetInnerHTML={{__html: shortDescription}} />
        
        <div className="post__footer">
          <PostAuthor authorID={authorID} createdAt={createdAt} />

          <Link className="btn category" to={`/posts/categories/${category}`}>
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
