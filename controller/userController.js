const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Post = require('../models/Post');
const mail = require('../middleware/mailsender');
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
               return res.status(400).json({"message": `User with email ${req.body.email} already exists`});
           }

           const user = new User(req.body);

            if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 10);
            }
            const accessToken = createAccessToken(user._id, user.email);
            user.accessToken = accessToken;
            await user.save();
            var text = `Dear ${user.fullname}! \n\n` +  `Your account has been successfully created`;
            await mail(user.email, "Account Creation", text);
            res.header('auth-token', accessToken);
            return res.status(200).json({"message": `${user.fullname} is successfully registered`,
                                  "user": user,
                                    });
            
        } catch (error) {
            res.status(500).json({error});
        }
    },

    createAuthorizedUser: async (req, res) => {
        try {
           if(await User.findOne({email: req.body.email})){
               return res.status(400).json({"message": `User with email ${req.body.email} already exists`});
           }

           const user = new User(req.body);

            if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 10);
            }
            const accessToken = createAccessToken(user._id, user.email);
            user.accessToken = accessToken;
            await user.save();
            var text = `Dear ${user.fullname}! \n\n` +  `Your account has been successfully created`;
            await mail(user.email, "Account Creation", text);
            res.header('auth-token', accessToken);
            return res.status(200).json({"message": `${user.fullname} is successfully registered`,
                                  "user": user,
                                    });
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
                                                      "user": user});
                      
           }else{
                return res.status(400).json({"message": `Incorrect password or email`});
           }
            
        } catch (error) {
            res.status(500).json({error});
        }
    },

    updateUser: async (req, res) => {
        try {
                
                let updatedUser = (req.body);
                const user = await User.findByIdAndUpdate(req.user_ID, {$set: updatedUser}, {upsert: true});
                var text = `Dear ${user.fullname}! \n\n` +  `Your account has been successfully updated`;
                await mail(user.email, "Account Update", text);
                return res.status(200).json({"message": `${user.email} successfully updated`,
                                      "user": user});
            
        } catch (error) {
            res.status(503).json(error);
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
            res.status(500).json(error);
        }
       
    }
}