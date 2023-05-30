import { create } from "zustand"

const postStore = create((set) => ({
  posts: null,
  getPosts : (postsData) => set({posts: [...postsData]})
})) 

export default postStore;