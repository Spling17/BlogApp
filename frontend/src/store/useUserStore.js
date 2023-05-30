import { create } from 'zustand'

const userStore = create((set) => ({
  user: {
    id: null,
    username: null,
    profilePicture: "", 
    coverPicture: "",
    followers: null,
    followings: null,
  },

  loginUser: (data) => set( {user: {
    id: data._id,
    username: data.username,
    profilePicture: data.profilePicture, 
    coverPicture: data.coverPicture,
    followers: data.followers,
    followings: data.followings,
  }})
})
)

export default userStore