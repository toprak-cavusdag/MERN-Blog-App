import React, { useState } from "react";
import PostItem from "./PostItem";
import { DUMMY_POST } from "../constant/data";

const Posts = () => {
  const [posts, setPosts] = useState(DUMMY_POST);
  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(({ id, thumbnail, authorID, category, desc, title }) => (
            <PostItem
              key={id}
              postID={id}
              thumbnail={thumbnail}
              authorID={authorID}
              category={category}
              desc={desc}
              title={title}
            />
          ))}
        </div>
      ) : (
        <h2 className="center">No Posts Found!</h2>
      )}
    </section>
  );
};

export default Posts;
