import express from 'express';
import User from '../../mongodb/models/userModel.js';
import Post from '../../mongodb/models/postModel.js';
import protect from '../../middlewares/authenticateUser.js';
const router = express.Router();
/*
  Description: GET all posts
  Route: /api/all_posts
  Access: Private
*/
router.route('/').get(protect, async (req, res) => {
  try{
    const user = req.user;
    if(!user){
      return res.status(401).json({message: "User not authorized"});
    }
    const posts = await Post.find({ user }).sort({_id: -1 }); // Returning posts in sorted order
    res.status(200).json({ posts});
  }catch(error){
    console.error(error);
    res.status(500).json({message: "Something went wrong with server"})
  }
})

export default router