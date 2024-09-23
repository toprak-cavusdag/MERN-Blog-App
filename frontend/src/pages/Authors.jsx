import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClients from "../lib/apiRequest";
import Loader from "../component/Loader";
const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAuthorHandle = async () => {
    setIsLoading(true);
    try {
      const response = await apiClients.apiBaseUrl.get("/users");
      setAuthors(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  };

  useEffect(() => {
    getAuthorHandle();
  }, []);

  if(isLoading){
    return <Loader />
  }

  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div  className="container authors__container">
          {authors?.map((item, index) => {
            return (
              <Link
                className="author"
                key={index}
                to={`/posts/users/${item._id}`}
              >
                <div className="author__avatar">
                  <img src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${item.avatar}`} alt={`Image of ${item.name}`} />
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
