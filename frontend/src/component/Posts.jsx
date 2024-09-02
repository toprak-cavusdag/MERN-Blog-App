import React, { useState } from "react";

import Thumbnail1 from "../assets/blog1.jpg";
import Thumbnail2 from "../assets/blog2.jpg";
import Thumbnail3 from "../assets/blog3.jpg";
import Thumbnail4 from "../assets/blog4.jpg";
import PostItem from "./PostItem";

const DUMMY_POST = [
  {
    id: 1,
    thumbnail: Thumbnail1,
    category: "education",
    title: "This is the title of the very first post on this blog.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta dolorem animi quas minima sapiente illum expedita impedit. Porro, pariatur incidunt, illum perspiciatis odit dolores nesciunt facilis minus minima quas eveniet.",
    authorID: 3,
  },

  {
    id: 2,
    thumbnail: Thumbnail2,
    category: "science",
    title: "This is the title of the very first post on this blog.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta dolorem animi quas minima sapiente illum expedita impedit. Porro, pariatur incidunt, illum perspiciatis odit dolores nesciunt facilis minus minima quas eveniet.",
    authorID: 1,
  },

  {
    id: 3,
    thumbnail: Thumbnail3,
    category: "weather",
    title: "This is the title of the very first post on this blog.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta dolorem animi quas minima sapiente illum expedita impedit. Porro, pariatur incidunt, illum perspiciatis odit dolores nesciunt facilis minus minima quas eveniet.",
    authorID: 13,
  },

  {
    id: 4,
    thumbnail: Thumbnail4,
    category: "farming",
    title: "This is the title of the very first post on this blog.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta dolorem animi quas minima sapiente illum expedita impedit. Porro, pariatur incidunt, illum perspiciatis odit dolores nesciunt facilis minus minima quas eveniet.",
    authorID: 11,
  },
];

const Posts = () => {
  const [posts, setPosts] = useState(DUMMY_POST);
  return (
    <section className="posts">
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
    </section>
  );
};

export default Posts;
