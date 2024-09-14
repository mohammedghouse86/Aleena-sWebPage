const bcrypt = require('bcrypt')
const { where } = require('sequelize');
const {sequelize, WebSiteUsers, Post}  = require('./models')
const express = require('express')


const app = express();
app.use(express.json());
// 1. Inserting new row into the DATABASE
app.post('/websiteusers', async(req, res)=>{
    const {name,email,role,age, password, photo} = req.body;
    try {
        // Check if user already exists
        const userExists = await WebSiteUsers.findOne({where:{"name":name}}); //checking if user exists
        if(userExists){  
        return res.status(400).json({message:"Bad Request, User Already Exists!!!"});}

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user1 = await WebSiteUsers.create({
            name,
            email,
            role,
            age,
            password:hashedPassword,
            photo
        }) 
        return res.status(202).json(user1);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
})
// 2. Fetching the entire table from the DATABASE
app.get('/Getwebsiteusers', async(req, res)=>{
    try {
        const user1 = await WebSiteUsers.findAll() 
        return res.status(202).json(user1);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
})
// 3. Fetching a perticular user from the table
app.get('/Getuser/:name', async(req, res)=>{
    try {
        const {"name":name} = req.params
        const user1 = await WebSiteUsers.findOne({where:{"name":name}});
        return res.status(202).json(user1);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
})
// 4. Editing a user details in the table
app.put('/Edituser/:name', async(req, res)=>{
    try {
        const {"name":oldname} = req.params;
        const {name, email, role, age} = req.body;
        
        const user1 = await WebSiteUsers.findOne({where:{"name":oldname}});
        console.log("this user details will be edited",oldname,user1)
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
})
// 5. Delete a row in the table
app.delete('/Deleteuser/:name', async(req, res)=>{
    try {
        const {"name":name} = req.params;
        const user1 = await WebSiteUsers.findOne({where:{"name":name}});
        await user1.destroy();
        return res.status(202).json({message:"Entry Deleted"});
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
})
// 6. Adding Row in post
app.post('/addPost', async(req, res)=>{
    const {userUuid, body} = req.body;
    try {
        const user1 = await WebSiteUsers.findOne({
            where: {uuid: userUuid} 
        })
        const post = await Post.create({body,userID:user1.id})
        return res.status(202).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
})
// 7. Reading all the post in the table Posts
app.get('/readPost', async(req, res)=>{
    try {
        const post = await Post.findAll()
        return res.status(202).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
})
// 8. Updating Row in Post
app.put('/updatePost', async(req, res)=>{
    const {UUid, body} = req.body;
    try {
        const post1 = await Post.findOne({
            where: {uuid: UUid} 
        });
        post1.body=body;
        await post1.save();
        return res.status(202).json(post1);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
})
// 9. Deleting Row in Post
app.delete('/deletePost', async(req, res)=>{
    const {UUid} = req.body;
    try {
        const post1 = await Post.findOne({
            where: {uuid: UUid} 
        });
        await post1.destroy();
        return res.status(202).json({message:"YOOO THIS ENTRY IS DELETED"});
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
})
// 10. Reading all the post by a single User in the table Posts
app.get('/readUserPost', async(req, res)=>{
    try {
        const {userID} = req.body;
        const post = await Post.findAll({where:{"userID":userID}});
        return res.status(202).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
})
// 11. Fetching a perticular user from the table
app.get('/getUserandPost/:uuid', async(req, res)=>{
    try {
        const {"uuid":uuid} = req.params
        const user1 = await WebSiteUsers.findOne({where:{"uuid":uuid},include:[Post]});
        return res.status(202).json(user1);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
})
app.listen({port:5000}, async()=>{
    console.log('SERVER UP AND RUNNING AT PORT 5000');
    await sequelize.sync({alter:true});
    console.log('DATABASE CONNECTED');
})
