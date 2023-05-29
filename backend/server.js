const express = require("express");
const app = express();
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const PORT = 3000;
const mongoose = require("mongoose");
require("dotenv").config();

//Connect Database
mongoose.connect(process.env.MONGOURL)
.then(() => {
 console.log("Connecting DB...");
})
.catch((err) => {
  console.log(err);
})

//Middleware
app.use(express.json());
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

app.get("/", (req, res) => {
  res.send("hello express")
})

app.listen(PORT, () => console.log("サーバー！"));