import express from 'express';
import Post from '../../mongodb/models/postModel.js'
import protect from '../../middlewares/authenticateUser.js'

const router = express.Router();

/*
  Description: POST unlike the post with given id 
  Route: POST /api/unlike/:id
  Access: Private
*/

router.route('/:id').post(protect, async (req, res) => {
  try{
    const post_id = req.params.id;
    const post = await Post.findById(post_id);
    if(!post){
      return res.status(404).json({message: "Post not found"});
    }
    const user = req.user;
    if(!user){
      res.status(401).json({message: "User not authenticated"});
    }
    const updated_post = await Post.findByIdAndUpdate(
      post_id,
      {likes: post.likes - 1},
      {new: true}
    )
    res.status(200).json(
    {
      message: "Post unliked Successfully", 
      post: {
        title: updated_post.title, 
        description: updated_post.description, 
        likes: updated_post.likes
      }
    });
  }catch(error){
    console.error(error)
    res.status(500).json({message: "Something went wrong with server"})
  }
})

export default router