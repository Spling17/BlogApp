const router = require("express") .Router();
const User = require("../models/User")

// router.get("/", (req, res) => {
//   res.send("auth router")
// })

//registerd users
router.post("/register", async(req,res) => {
  try {
    const formData = req.body

    const newUser = await new User(formData);

    // const newUser = await new User({
    //   username: req.body.username,
    //   email: req.body.email,
    //   password: req.body.password,
    // });

    const user = await newUser.save();
    return res.status(200).json(user);

    // return res.json(newUser)

  } catch (err){
    return res.status(500).json(err);
  }
});

//login
router.post("/login", async(req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(404).send("User NOT Found");
    const validPassword = req.body.password === user.password;
    if (!validPassword) return res.status(400).send("Wrong Password.");
    return res.status(200).json(user);
  } catch (err){
    return res.status(500).json(err);
  }
})


module.exports = router;