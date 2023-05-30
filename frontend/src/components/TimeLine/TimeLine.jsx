import { useState, useEffect } from 'react';
import "./TimeLine.css";
import Share from "../Share/Share"
import Post from "../Post/Post"
import axios from "axios";
// import { Posts } from "../../dummyData"
import userStore from '../../store/useUserStore';
import postStore from '../../store/usePostStore';

export default function TimeLine() {
  // const [posts, setPosts] = useState([]);

  const {id} = userStore((state) => state.user)

  const {posts, getPosts} = postStore((state) => state)
  
  const fetchPosts = async () => {
    const response = await    
     axios.get(`http://localhost:3000/api/posts/timeline/${id}`)
    console.log(response.data);
    return response.data
  };

  useEffect(() => {
    (async() => {
      const postsData = await fetchPosts()
      getPosts(postsData);
    })()
  }, [])

  useEffect(() => {
    console.log({posts})
  },[posts])

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts && posts.map((post) => (
          <Post {...post} key={post._id}/>
        ))}

      </div>
    </div>
  );
}
