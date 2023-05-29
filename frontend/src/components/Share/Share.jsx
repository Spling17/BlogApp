import React from 'react'
import "./Share.css"
import { Image, Gif, Analytics, Face } from '@mui/icons-material';
import { useRef } from "react";
// import { container } from 'webpack';
import axios from 'axios';

export default function Share() {
  const desc = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    }; 
    try{
      await axios.post("/posts", newPost);
      window.location.reload();
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
