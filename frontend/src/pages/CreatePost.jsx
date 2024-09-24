import React, { useState, useContext, useEffect } from "react";
import { POST_CATEGORIES } from "../constant/data";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import apiClients from "../lib/apiRequest";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  //Redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "-1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const createPostHandle = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);
    postData.set("thumbnail", thumbnail);

    try {
      const response = await apiClients.apiBaseUrl.post(`/posts`, postData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if(response.status === 200){
        return navigate("/")
      }

    } catch (error) {
      setError(error.response.data.message)
    }
  };

  return (
    <div className="create-post top-push">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className="form__error-message">{error}</p>}
        <form className="form create-post__form" onSubmit={createPostHandle}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
          />
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="png, jpeg, jpg, webp"
          />
          <button type="submit" className="btn primary">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
