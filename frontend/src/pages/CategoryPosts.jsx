import React, { useEffect, useState } from "react";
import PostItem from "../component/PostItem";
import { useParams } from "react-router-dom";
import apiClients from "../lib/apiRequest";
import Loader from "../component/Loader";

const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { category } = useParams();
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await apiClients.apiBaseUrl.get(
        `posts/categories/${category}`
      );
      setPosts(response?.data);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [category]);

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

export default CategoryPosts;
