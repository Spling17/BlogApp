import React, { useState, useEffect } from 'react';
import "./Post.css";
// import { MoreVert } from '@mui/icons-material';
import { EditIcon, DeleteIcon } from '@mui/icons-material/Edit';
import axios from "axios";

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users/${post.userId}`)
      setUser(response.data);
    };
    fetchUser();
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/posts/timeline/64726468d3010375cc942688");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

//   const createPost = async (postData) => {
//     try {
//       const response = await axios.post("/posts/create", postData);
//       const newPost = response.data;
//       setPosts([...posts, newPost]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const editPost = async (postId, updatedData) => {
//     try {
//       await axios.put(`/posts/edit/${postId}`, updatedData);
//       const updatedPosts = posts.map((post) =>
//         post.id === postId ? { ...post, ...updatedData } : post
//       );
//       setPosts(updatedPosts);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deletePost = async (postId) => {
//     try {
//       await axios.delete(`/posts/delete/${postId}`);
//       const updatedPosts = posts.filter((post) => post.id !== postId);
//       setPosts(updatedPosts);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="timeline">
//       <div className="timelineWrapper">
//         <Share createPost={createPost} />
//         {posts.map((post) => (
//           <Post
//             key={post.id}
//             post={post}
//             editPost={editPost}
//             deletePost={deletePost}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
  

  const handleLike = () => {
    // setLike(isLiked ? like -1 : like + 1);
    setLike(like + 1);
    setIsLiked(!isLiked);
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src="./assets/person/1.jpeg" alt="" className="postProofileImg" />
            <span className="postUsername">HARU</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <EditIcon />
            <DeleteIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={post.photo} alt="" className="postImg"/>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img 
              src="./assets/heart.png" 
              alt="" 
              className="likeIcon"
              onClick={() => handleLike()}
            />
            <span className="postLikeCounter">{like} likes</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}: comments</span>
          </div>
          <div className="commentSubmit" type="submit">
            <form>
              <input type="text" className="commentSubmitButton" placeholder="Comment"/>
              <button className="commentSubmitButton" type="submit"></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
