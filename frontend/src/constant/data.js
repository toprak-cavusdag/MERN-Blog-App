import Thumbnail1 from "../assets/blog1.jpg";
import Thumbnail2 from "../assets/blog2.jpg";
import Thumbnail3 from "../assets/blog3.jpg";
import Thumbnail4 from "../assets/blog5.jpg";

import Avatar1 from "../assets/avatar1.jpg";
import Avatar2 from "../assets/avatar2.jpg";
import Avatar3 from "../assets/avatar3.jpg";
import Avatar4 from "../assets/avatar4.jpg";
import Avatar5 from "../assets/avatar5.jpg";

export const DUMMY_POST = [
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

export const AUTHORS_DUMMY = [
  {
    id:1, 
    avatar:Avatar1,
    name: "Ernest Archiever",
    posts:3
  },
  {
    id:2, 
    avatar:Avatar2,
    name: "Jane Doe",
    posts:1
  },
  {
    id:3, 
    avatar:Avatar3,
    name: "Leo Tolstoy",
    posts:3
  },
  {
    id:4, 
    avatar:Avatar4,
    name: "Charles Dickens",
    posts:10
  },
  {
    id:5, 
    avatar:Avatar5,
    name: "Fyodor Dostoev",
    posts:8
  },
];
