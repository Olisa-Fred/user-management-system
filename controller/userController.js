const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Post = require('../models/Post');
require('dotenv').config()
const {createAccessToken} = require('../config/token');

module.exports = {
    getUsers: async (req, res) =>{
        try {
            const users = await User.find();
            res.status(200).json({users});
        } catch (error) {
            res.status(500).json({error});
        }
    },

    createRegularUser: async (req, res) => {
        try {
           if(await User.findOne({email: req.body.email})){
               return res.status(400).send(`User with email ${req.body.email} already exists`);
           }

           const user = new User(req.body);

            if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 10);
            }
            const accessToken = createAccessToken(user._id, user.email);
            user.accessToken = accessToken;
            await user.save();
            res.status(200).send(`${user.fullname} is successfully registered`);
        } catch (error) {
            res.status(500).json({error});
        }
    },

    createAuthorizedUser: async (req, res) => {
        try {
           if(await User.findOne({email: req.body.email})){
               return res.status(400).send(`User with email ${req.body.email} already exists`);
           }

           const user = new User(req.body);

            if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 10);
            }
            const accessToken = createAccessToken(user._id, user.email);
            user.accessToken = accessToken;
            await user.save();

            res.status(200).send(`${user.fullname} is successfully registered`);
        } catch (error) {
            res.status(500).json({error});
        }
    },

    userLogin: async (req, res) => {
        try {
            const user = await User.findOne({email: req.body.email});
            const check = await bcrypt.compare(req.body.password, user.password);
           if(user && check){
                const accessToken = createAccessToken(user._id, user.email);
                await User.findByIdAndUpdate(user._id, { accessToken });
                res.header('auth-token', accessToken).json({
                                                      "message":"Login successful",
                                                      "token": accessToken});
                      
           }else{
                return res.status(400).send(`Incorrect password or email`);
           }
            
        } catch (error) {
            res.status(500).json({error});
        }
    },

    updateUser: async (req, res) => {
        try {
                let updatedUser = (req.body);
                const result = await User.findByIdAndUpdate(req.userID, {$set: updatedUser}, {upsert: true});

                res.status(200).json({result});
            
        } catch (error) {
            res.status(503).send(error);
            console.log(error);
        }
    },

    postIdea: async (req, res) =>{
        try {
            const postBy = await User.findOne({_id: req.user_ID});
            const newPost = new Post ({
                author: postBy.name,
                title: req.body.title,
                description: req.body.description

            })
            const post = await newPost.save();
            return res.status(200).json({
                "message": "New idea created",
                "Author": post.author,
                "Idea": post.title,
                "Body": post.description
                })
        } catch (error) {
            res.status(500).send(error);
        }
       
    }
}