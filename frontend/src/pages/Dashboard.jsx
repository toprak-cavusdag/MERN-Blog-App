import React, { useContext, useEffect, useState } from "react";
import { DUMMY_POST } from "../constant/data";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Loader from "../component/Loader";
import apiClients from "../lib/apiRequest";
import DeletePost from "./DeletePost";

const Dashboard = () => {
  const [posts, setPosts] = useState(DUMMY_POST);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const { id } = useParams();

  //Redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    fetchDataHandle();
  }, [id, token]);

  const fetchDataHandle = async () => {
    setIsLoading(true);
    try {
      const response = await apiClients.apiBaseUrl.get(`/posts/users/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="dashboard">
      {posts.length ? (
        <div className="container dashboard__container">
          {posts.map((post, index) => (
            <article key={index} className="dashboard__post">
              <div className="dashboard__post-info">
                <div className="dashboard_post-thumbnail">
                  <img
                    src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${
                      post?.thumbnail
                    }`}
                    alt=""
                  />
                </div>
                <h5>{post.title}</h5>
              </div>
              <div className="dashboard__post-actions">
                <Link to={`/posts/${post._id}`} className="btn sm">
                  View
                </Link>
                <Link to={`/posts/${post._id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <DeletePost postID={post._id} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="center"> You have no posts yet.</h2>
      )}
    </section>
  );
};

export default Dashboard;
