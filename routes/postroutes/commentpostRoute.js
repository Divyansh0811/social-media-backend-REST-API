import express from 'express';
import Post from '../../mongodb/models/postModel.js'
import User from '../../mongodb/models/userModel.js';
import protect from '../../middlewares/authenticateUser.js'

const router = express.Router();

/*
  Description: POST comment on post with given ID
  Route: POST /api/comment/id
  Access: Private 
*/

router.route('/:id').post(protect, async (req, res) => {
  console.log("Hi, starting.....")
  const { text } = req.body;
  console.log("Text: ", text)
  if(!text){
    return res.status(400).json({message: "Please add a text comment"});
  }
  const post_id = req.params.id;
  const post = await Post.findById(post_id);
  console.log("Post: ", post)
  if(!post){
    return res.status(404).json({message: "Post not found"});
  }

  const user = req.user;
  if(!user){
    return res.status(401).json({ message: "User not authenticated" });
  }
  console.log("User: ", user);
  const user_email = user.email;
  const name = user_email.split("@");
  const username = name[0];
  console.log("user_email: ", user_email, "name: ", name, "username: ", username);
  const new_post = await Post.updateOne(
    {_id: post_id},
    {
      $push: {
        comments: [{username, text}]
      }
    }
  )
  const added_comment = post.comments.slice(-1);
  console.log("added comment: ", added_comment);
  res.status(200).json({message: "Comment added successfully",
    comments: added_comment
  })
})

export default router