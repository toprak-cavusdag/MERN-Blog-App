import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";
import apiClients from "../lib/apiRequest";
import Loader from "../component/Loader";

const DeletePost = ({ postID: id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  //Redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const removePost = async (id) => {
    setIsLoading(true);
    try {
      const response = await apiClients.apiBaseUrl.delete(`/posts/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        console.log("Post deleted successfully");
        if (location.pathname === `/myposts/${currentUser.id}`) {
          window.location.reload();
        } else {
          navigate("/");
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error(
        "Error deleting post:",
        error.response ? error.response.data : error.message
      );
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <button className="btn sm danger" onClick={() => removePost(id)}>
      Delete
    </button>
  );
};

export default DeletePost;
