import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthorPosts from "./pages/AuthorPosts";
import Authors from "./pages/Authors";
import UserProfile from "./pages/UserProfile";
import CreatePost from "./pages/CreatePost";
import CategoryPosts from "./pages/CategoryPosts";
import Dashboard from "./pages/Dashboard";
import EditPost from "./pages/EditPost";
import DeletePost from "./pages/DeletePost";
import Logout from "./pages/Logout";
import UserProvider from "./context/userContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <Layout />
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/posts/:id", element: <PostDetail /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/profile/:id", element: <UserProfile /> },
      { path: "/authors", element: <Authors /> },
      { path: "/create", element: <CreatePost /> },
      { path: "/posts/categories/:category", element: <CategoryPosts /> },
      { path: "/posts/users/:id", element: <AuthorPosts /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "/posts/:id/delete", element: <DeletePost /> },
      { path: "/myposts/:id", element: <Dashboard /> },
      { path: "/logout", element: <Logout /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
