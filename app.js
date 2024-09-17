const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const multer = require('multer');
const { sequelize, WebSiteUsers, Post, Wallet, lrb } = require("./models");
const express = require("express");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({
      storage: storage,
      limits: { fileSize: 150 * 1024 }, // Set limit to 150 KB
    });
// 1. Inserting new row into the DATABASE
app.post("/websiteusers", upload.single('photo'), async (req, res) => {
  const { name, email, role, age, password } = req.body;

  const photo = req.file;  // Access the uploaded file from multer
  console.log("this is FILE >>>>>>>", req)
  try {
    // Check if user already exists
    const userExists = await WebSiteUsers.findOne({ where: { name: name } }); //checking if user exists
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Bad Request, User Already Exists!!!" });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user1 = await WebSiteUsers.create({
      name,
      email,
      role,
      age,
      password: hashedPassword,
      photo: photo.buffer,
    });
    return res.status(200).json(user1);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
// 2. Fetching the entire table from the DATABASE
app.get("/Getwebsiteusers", async (req, res) => {
  try {
    const user1 = await WebSiteUsers.findAll();
    return res.status(202).json(user1);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
// 3. Fetching a perticular user from the table
app.get("/Getuser/:name", async (req, res) => {
  try {
    const { name: name } = req.params;
    const user1 = await WebSiteUsers.findOne({ where: { name: name } });
    return res.status(202).json(user1);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
// 3A. Fetching a perticular user's photo from the table
app.get("/Getuserphoto/:name", async (req, res) => {
  try {
    const { name: name } = req.params;
    const user1 = await WebSiteUsers.findOne({ where: { name: name } });
    const photo = user1.photo.toString('base64');
    return res.status(202).json(photo);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
// 4. Editing a user details in the table
app.put("/Edituser/:name", async (req, res) => {
  try {
    const { name: oldname } = req.params;
    const { name, email, role, age } = req.body;

    const user1 = await WebSiteUsers.findOne({ where: { name: oldname } });
    console.log("this user details will be edited", oldname, user1);
    user1.name = name || user1.name;
    user1.email = email || user1.email;
    user1.role = role || user1.role;
    user1.age = age || user1.age;
    await user1.save();
    return res.status(202).json(user1);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
// 5. Delete a row in the table
app.delete("/Deleteuser/:name", async (req, res) => {
  try {
    const { name: name } = req.params;
    const user1 = await WebSiteUsers.findOne({ where: { name: name } });
    await user1.destroy();
    return res.status(202).json({ message: "Entry Deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
// 6. Adding Row in post
app.post("/addPost", async (req, res) => {
  const { userUuid, body } = req.body;
  try {
    const user1 = await WebSiteUsers.findOne({
      where: { uuid: userUuid },
    });
    const post = await Post.create({ body, userID: user1.id });
    return res.status(202).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
// 7. Reading all the post in the table Posts
app.get("/readPost", async (req, res) => {
  try {
    const post = await Post.findAll();
    return res.status(202).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
// 8. Updating Row in Post
app.put("/updatePost", async (req, res) => {
  const { UUid, body } = req.body;
  try {
    const post1 = await Post.findOne({
      where: { uuid: UUid },
    });
    post1.body = body;
    await post1.save();
    return res.status(202).json(post1);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
// 9. Deleting Row in Post
app.delete("/deletePost", async (req, res) => {
  const { UUid } = req.body;
  try {
    const post1 = await Post.findOne({
      where: { uuid: UUid },
    });
    await post1.destroy();
    return res.status(202).json({ message: "YOOO THIS ENTRY IS DELETED" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
// 10. Reading all the post by a single User in the table Posts
app.get("/readUserPost", async (req, res) => {
  try {
    const { userID } = req.body;
    const post = await Post.findAll({ where: { userID: userID } });
    return res.status(202).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
// 11. Fetching a perticular user from the table
app.get("/getUserandPost/:uuid", async (req, res) => {
  try {
    const { uuid: uuid } = req.params;
    const user1 = await WebSiteUsers.findOne({
      where: { uuid: uuid },
      include: [Post],
    });
    return res.status(202).json(user1);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
// 12. Adding Row in Wallets
app.post("/addMoney", async (req, res) => {
  const { userUuid, money } = req.body;
  try {
    const user1 = await WebSiteUsers.findOne({
      where: { uuid: userUuid },
    });
    //checking if wallet is empty or not 
    const isWalletFull = await Wallet.findOne({where: { userId: user1.id }});
    //When wallet is not empty delete the old data and add new
    if(isWalletFull){
    
      await Wallet.update(
        { dollars: money },           // New values
        { where: { userId: user1.id }} // Where condition
      );
      const isWalletFull1 = await Wallet.findOne({where: { userId: user1.id }});
    return res.status(202).json({isWalletFull1,message:'Wallet Updated!!!'});}
    else{
    const wallet = await Wallet.create({ dollars:money, userID: user1.id });
    return res.status(202).json({wallet,message:'Wallet Created!!!'});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
// 13. Deleting Row in Wallets
app.delete("/deleteMoney", async (req, res) => {
  const { userUuid } = req.body;
  try {
    const user1 = await WebSiteUsers.findOne({
      where: { uuid: userUuid },
    });
    //checking if wallet is empty or not 
    const isWalletFull = await Wallet.findOne({where: { userId: user1.id }});
    //When wallet is not empty delete the old data and add new
    if(isWalletFull){
      await Wallet.destroy({where:{ userId: user1.id }} 
      );
    return res.status(202).json({message:'Wallet Deleted!!!'});}
    else{
      return res.status(202).json({message:'Wallet Does not Exists!!!'});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
// 14. Reading all the wallets
app.get("/readMoney", async (req, res) => {
  try {
    const wallet2 = await Wallet.findAll();
    return res.status(202).json(wallet2);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
// 15. Adding Like, Retweet, BookMark
app.post("/addLIRTBM", async (req, res) => {
  const { userUuid, PostUuid, likes, retweet, bookmarks } = req.body;
  try {
    console.log('/-/-/-/-/-/-/-///-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/likes:', likes, 'retweet:', retweet, 'bookmarks:', bookmarks);

    //retriving the user 
    const user1 = await WebSiteUsers.findOne({
      where: { uuid: userUuid },
    });
    //retriving the post 
    const post1 = await Post.findOne({
      where: { uuid: PostUuid },
    });
    //Checking if the user has ever liked retweeted or bookedmarked 
    const exists = await lrb.findOne({
      where: { userID: user1.id, postID:post1.id },
    });
    if (exists){
      await lrb.update(
        { likes: likes,           // New values
         retweet: retweet ,           // New values
         bookmarks: bookmarks },           // New values
        { where: { userId: user1.id, postID:post1.id  }} // Where condition
      );
      return res.status(202).json({message:'liked retweeted bookedmark updated!!!'});
    }
    else{
    const post = await lrb.create({ likes, retweet, bookmarks, userID: user1.id, PostID: post1.id });
    return res.status(202).json({post, message:'liked retweeted bookedmark added!!!'});}
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
// 16. Reading Like, Retweet, BookMark
app.get("/readLIRTBM", async (req, res) => {
  const {userUuid, PostUuid} = req.body;
  try {
    const exists = await lrb.findOne({
      where: { userID: userUuid, postID:PostUuid },
    });
    console.log("this is exists from Reading Like, Retweet, BookMark `-`-`-`-`-`-`-`-``>>>>>>`-`-`-`-`->>>>>", exists);
    if (exists){
      return res.status(202).json(exists);}
    else {
      return res.status(202).json({like:false, retweet:false, bookmark:false});
    }}
    catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  });

app.listen({ port: 5000 }, async () => {
  console.log("SERVER UP AND RUNNING AT PORT 5000");
  await sequelize.sync({ alter: true });
  console.log("DATABASE CONNECTED");
});
