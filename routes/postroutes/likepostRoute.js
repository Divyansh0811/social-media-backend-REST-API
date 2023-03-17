import express from 'express';
import Post from '../../mongodb/models/postModel.js'
import protect from '../../middlewares/authenticateUser.js'

const router = express.Router();

/*
  Description: POST like the post with given id 
  Route: POST /api/like/:id
  Access: Private
*/

router.route('/:id').post(protect, async (req, res) => {
  try{
    console.log("Hi, liking post....")
    const post_id = req.params.id;
    const post = await Post.findById(post_id);
    console.log("Post: ", post);
    if(!post){
      return res.status(404).json({message: "Post not found"});
    }
    const user = req.user;
    console.log("User: ", user);
    if(!user){
      res.status(401).json({message: "User not authenticated"});
    }
    const updated_post = await Post.findByIdAndUpdate(
      post_id,
      {likes: post.likes + 1},
      {new: true}
    )
    console.log("Liked post: ", post);
    res.status(200).json(
    {
      message: "Post liked Successfully", 
      post: updated_post
    });
  }catch(error){
    console.error(error)
    res.status(500).json({message: "Something went wrong with server"})
  }
})

export default router