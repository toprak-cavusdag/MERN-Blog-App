import React, { useState } from "react";
import { DUMMY_POST } from "../constant/data";
import PostItem from "../component/PostItem";

const CategoryPosts = () => {
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

export default CategoryPosts;
