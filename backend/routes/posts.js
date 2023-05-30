const router = require("express") .Router();
const Post = require("../models/Post");
const User = require("../models/User");

// router.get("/", (req, res) => {
//   console.log('first')
//   res.send("posts router")
// })

//Create
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// router.post("/create", async (req, res) => {
//   const newPost = new Post(req.body);
//   try {
//     const savedPost = await newPost.save();
//     return res.status(200).json(savedPost);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

//Update
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      return res.status(200).json("Changed to post edit")
    } else {
      return res.status(403).json("You can't edit other people's posts")
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

//Dalete
router.delete("/:id", async (req, res) => {
// router.delete("/api/posts/timeline/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(req.body)
    if(post.userId === req.body.userId) {
      console.log('first')
      await post.deleteOne();
      return res.status(200).json("Post deleted")
    } else {
      return res.status(403).json("You can't delete other peoples posts")
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

//Read
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
      return res.status(200).json(post)
  } catch (err) {
    return res.status(403).json(err);
  }
});

//GET Timeline
router.get("/timeline/:userId", async(req, res) => {
  const currentUser = req.params.userId
  try {
    // const currentUser = await User.findById(req.params.userId);
    // const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser });
    // console.log({userPosts})
    //自分がフォローしている友達の投稿内容を全て取得する
    // const friendPosts = await Promise.all (
    //   currentUser.followings.map((friendId) => {
    //     return Post.find({ userId: friendId }); 
    //   })
    // );
    // return res.status(200).json(userPosts.concat(...friendPosts)) 
    return res.status(200).json(userPosts) 
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Comments
// router.post("/comment", async (req, res) => {
//   const newComment = new Comment(req.body);
//   try {
//     const savedComment = await newComment.save();
//     return res.status(200).json(savedComment);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });


module.exports = router;