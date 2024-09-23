import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import apiClients from "../lib/apiRequest";
import Loader from "./Loader";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await apiClients.apiBaseUrl.get("/posts");
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  if(isLoading){
    return <Loader />
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

export default Posts;
