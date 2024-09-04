import React, { useState } from "react";
import { AUTHORS_DUMMY } from "../constant/data";
import { Link } from "react-router-dom";
const Authors = () => {
  const [authors, setAuthors] = useState(AUTHORS_DUMMY);
  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors__container">
          {authors?.map((item) => {
            return (
              <Link className="author" key={item.id} to={`/posts/users/${item.id}`}>
                <div className="author__avatar">
                  <img src={item.avatar} alt={`Image of ${item.name}`} />
                </div>
                <div className="author__info">
                  <h4>{item.name}</h4>
                  <p>{item.posts} posts</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h2 className="center">No users/authors found.</h2>
      )}
    </section>
  );
};

export default Authors;
