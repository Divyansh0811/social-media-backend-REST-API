import express from 'express';
import Post from '../../mongodb/models/postModel.js'
import protect from '../../middlewares/authenticateUser.js'
import User from '../../mongodb/models/userModel.js'

const router = express.Router();
/*
  Description: Create new post
  Route: POST /api/posts
  access: private
*/
router.route('/').post(protect, async (req, res) => {
  try{
    const { title, description } = req.body;
    if(!title || !description){
      return res.status(400).json({message: "Please fill all the fields"});
    }
    const user = req.user;
    if(!user){
      return res.status(401).json({message: "User not authenticated"});
    }
    const name = user.email.split("@");
    const user_name = name[0];
    const post = await Post.create({
      name: user_name,
      title: title,
      description: description,
      user: user.id
    })

    res.status(200).json({post: post});
  }catch(error){
    console.error(error)
    res.status(500).json({message: "Something went wrong with server"});
  }
})
/*
 Description: Delete a post
 Route: DELETE /api/posts/id
 access: private
*/
router.route('/:id').delete(protect, async (req, res) => {
  try{
    const post_id = req.params.id;
    const post = await Post.findById(post_id);
    if(!post){
      return res.status(400).json({message: "Post not found"})
    }
    if(!req.user){
      return res.status(401).json({message: "User not authenticated"})
    }

    const authenticated_user = await User.findById(req.user.id);
    if(authenticated_user.email !== req.user.email){
      return res.status(401).json({message: "User not authenticated"})
    }
    await post.deleteOne(({id: post_id}))
    res.status(200).json({id: post_id, message: "Post deleted successfully"});
  }catch(error){
    console.error(error);
    res.status(500).json({message: "Something went wrong with server"});
  }
})

/*
  Description: GET post with given id
  Route: /api/posts/id
  access: private
*/
router.route('/:id').get(protect, async (req, res) => {
  try{
    const post_id = req.params.id;
    const post = await Post.findById(post_id);
    if(!post){
      return res.status(404).json({message: "Post not found"});
    }
    const user = req.user;
    if(!user){
      return res.status(401).json({message: "User not authenticated"});
    }
    res.status(200).json(post);
  }catch(error){
    console.error(error)
    res.status(500).json({message: "Something went wrong with server"})
  }
})

/*
  Description: GET all post
  Route: GET /api/all_posts
  access: private
*/

router.route('/all_posts').get(protect, async (req, res) => {
  try{
    const authenticated_user = req.user;
    if(!authenticated_user){
      return res.status(401).json({message: "User not authenticated"})
    }
    const posts = await Post.find({user: authenticated_user})
    res.status(200).json(posts);
  }catch(error){
    console.error(error)
    res.status(500).json({message: "Something went wrong with server"});
  }
})
export default router 