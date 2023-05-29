const router = require("express") .Router();
const Post = require("../models/Post");
const User = require("../models/User");

// router.get("/", (req, res) => {
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

//Update
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      return res.status(200).json("投稿編集に変更しました")
    } else {
      return res.status(403).json("あなたは他の人の投稿を編集できません")
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

//Dalete
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json("投稿を削除しました")
    } else {
      return res.status(403).json("あなたは他の人の投稿を削除できません")
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
  try {
    const currentUser = await User.findById(req.params.userId);
    // const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    //自分がフォローしている友達の投稿内容を全て取得する
    // const friendPosts = await Promose.all (
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


module.exports = router;