import React, { useEffect, useState } from "react";
import PostItem from "../component/PostItem";
import Loader from "../component/Loader";
import { useParams } from "react-router-dom";
import apiClients from "../lib/apiRequest";

const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await apiClients.apiBaseUrl.get(`posts/users/${id}`);
      setPosts(response?.data);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    

    fetchPosts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(
            ({
              _id: id,
              thumbnail,
              creator,
              category,
              description,
              title,
              createdAt,
            }) => {
              return (
                <PostItem
                  key={id}
                  postID={id}
                  createdAt={createdAt}
                  thumbnail={thumbnail}
                  authorID={creator}
                  category={category}
                  desc={description}
                  title={title}
                />
              );
            }
          )}
        </div>
      ) : (
        <h2 className="center">No Posts Found!</h2>
      )}
    </section>
  );
};

export default AuthorPosts;
