import React, { useState, useEffect } from 'react';
import "./TimeLine.css";
import Share from "../Share/Share"
import Post from "../Post/Post"
import axios from "axios";
// import { Posts } from "../../dummyData"

export default function TimeLine() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/api/posts/timeline/64726468d3010375cc942688")
      console.log(response.data);
    };
    fetchPosts();
  }, [])

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {/* {Posts.map((post) => (
          <Post post={post} key={post.id}/>
        ))} */}

      </div>
    </div>
  );
}
