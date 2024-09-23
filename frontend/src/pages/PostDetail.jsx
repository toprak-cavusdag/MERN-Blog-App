import React, { useEffect, useState, useContext } from "react";
import PostAuthor from "../component/PostAuthor";
import { Link, useParams } from "react-router-dom";
import Loader from "../component/Loader";
import { UserContext } from "../context/userContext";
import DeletePost from "./DeletePost";
import apiClients from "../lib/apiRequest";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  const getPostHandle = async () => {
    setIsLoading(true);
    try {
      const response = await apiClients.apiBaseUrl.get(`/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPostHandle();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="post-detail">
      {error && <p className="error">{error}</p>}
      {post && (
        <div className="container post-detail__container">
          <div className="post-detail__header">
              <PostAuthor authorID={post.creator} createdAt={post.createdAt} /> 
            {currentUser?.id === post?.creator && (
              <div className="post-detail__buttons">
                <Link to={`/posts/${post?._id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <DeletePost postID={id} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className="post-detail__thumbnail">
            <img src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
          </div>
          <p dangerouslySetInnerHTML={{__html: post.description}}></p>
        </div>
      )}
    </section>
  );
};

export default PostDetail;
