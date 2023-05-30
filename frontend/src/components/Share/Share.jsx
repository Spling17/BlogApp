import "./Share.css"
import { Image, Gif, Analytics, Face } from '@mui/icons-material';
import { useRef } from "react";
// import { container } from 'webpack';
import axios from 'axios';
import userStore from "../../store/useUserStore";
import postStore from "../../store/usePostStore";

export default function Share() {
  const desc = useRef();
  
  const {id} = userStore((state) => state.user)
  const { getPosts } = postStore((state) => state)

  const fetchPosts = async () => {
    const response = await    
     axios.get(`http://localhost:3000/api/posts/timeline/${id}`)
    console.log(response.data);
    return response.data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: id,
      desc: desc.current.value,
    }; 
    try{
     const res = await axios.post("http://localhost:3000/api/posts", newPost);
      console.log(res)
      if(res.status === 200) {
          const postsData = await fetchPosts()
          getPosts(postsData);
          desc.current.value = ''
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div   className="share">
      <div className="shareWarapper">
        <div className="shareTop">
          <img src="/assets/person/1.jpeg" alt="" className="shareProfileImg"/>
          <input 
          ref={desc}
            type="text"
            className="shareInput"
            placeholder="What's on your mind?"
          />
        </div>
      </div>

      <hr className="shareHr"/>
    
      <form className="shareButtons" onSubmit={(e) => handleSubmit(e)}>
        <div className="shareOptions">
          <div className="shareOption">
            <Image className="shareIcon" htmlColor="blue"/>
            <span className="shareOptionText">Photo</span>
          </div>
          <div className="shareOption">
            <Gif className="shareIcon" htmlColor="hotpink"/>
            <span className="shareOptionText">GIF</span>
          </div>
          <div className="shareOption">
            <Face className="shareIcon" htmlColor="green"/>
            <span className="shareOptionText">Feeling</span>
          </div>
          <div className="shareOption">
            <Analytics className="shareIcon" htmlColor="red"/>
            <span className="shareOptionText">Analytics</span>
          </div>
          <button className="shareButton" type="submit">Share Now</button>
        </div>
      </form>
    </div>
  );
}
