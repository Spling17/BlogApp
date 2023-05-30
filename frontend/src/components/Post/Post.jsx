import { useEffect, useState, useRef } from 'react';
import "./Post.css";
// import { MoreVert } from '@mui/icons-material';
// import { EditIcon, DeleteIcon } from '@mui/icons-material/Edit';
import axios from "axios";
import postStore from '../../store/usePostStore';

export default function Post({createdAt, desc, img, likes, userId, _id}) {
  // const [like, setLike] = useState(post.like);
  // const [isLiked, setIsLiked] = useState(false);
  const { getPosts } = postStore((state) => state)
  const [edit, setEdit] = useState(false);
  const descRef = useRef();
  const fetchPosts = async () => {
    const response = await    
     axios.get(`http://localhost:3000/api/posts/timeline/${userId}`)
    console.log(response.data);
    return response.data
  };


  const editPost = async (e) => {
    e.preventDefault();
    const editData = {
      userId,
      desc: descRef.current.value
      }
    console.log(userId)
    const res = await axios.put(`http://localhost:3000/api/posts/${_id}`, editData);
    console.log({res})
    const postsData = await fetchPosts()
    getPosts(postsData);
    setEdit(false);
  }
  const deletePost = async () => {
    console.log(userId)
    const res = await axios.delete(`http://localhost:3000/api/posts/${_id}`, { data: { userId }});
    console.log({res})
    const postsData = await fetchPosts()
    getPosts(postsData);
  }
  const handleLike = () => {
    // setLike(isLiked ? like -1 : like + 1);
    // setLike(like + 1);
    // setIsLiked(!isLiked);
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src="./assets/person/1.jpeg" alt="" className="postProofileImg" />
            <span className="postUsername">HARU</span>
            <span className="postDate">{createdAt}</span>
          </div>
          <div className="postTopRight">
            {/* <EditIcon />
            <DeleteIcon /> */}
            <div>
              {edit && (
              <>
              <form onSubmit={(e) => editPost(e)}>
              <textarea ref={descRef} placeholder='' defaultValue={desc}></textarea>
              <button className='bg-red-100'>Change</button>
              </form>
              </>
              )}
              </div>
            <button onClick={() => setEdit((prev) => !prev)}>Edit</button>
            <button onClick={() => deletePost()}>Delete</button>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{desc}</span>
          <img src={img} alt="" className="postImg"/>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img 
              src="./assets/heart.png" 
              alt="" 
              className="likeIcon"
              onClick={() => handleLike()}
            />
            <span className="postLikeCounter">{likes.length} likes</span>
          </div>
          <div className="postBottomRight">
            {/* <span className="postCommentText">{comment}: comments</span> */}
          </div>
          <div className="commentSubmit" type="submit">
            <form>
              <input type="text" className="commentSubmitButton" placeholder="Comment"/>
              {/* <button className="commentSubmitButton" type="submit"></button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
