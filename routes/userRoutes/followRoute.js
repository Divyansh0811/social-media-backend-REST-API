import express from 'express';
import User from '../../mongodb/models/userModel.js';
import protect  from '../../middlewares/authenticateUser.js'

const router = express.Router();
/*
  Description: Follow user with params id
  Route: POST /api/follow/id
  Access: Private
*/
router.route('/:id').post(protect, async (req, res) => {
  try{

    const authenticated_user_id = req.user.id;
    const authenticated_user = await User.findById(authenticated_user_id);

    if(!authenticated_user_id || !authenticated_user){
      return res.status(401).json({message: "Please authenticate the user using token on /api/token"})
    }
    // console.log("Authenticated user id: ", authenticated_user_id);
    // console.log("Old auth user following count: ", authenticated_user.following)

    const followed_user_id = req.params.id;
    const followed_user = await User.findById(followed_user_id);

    if(!followed_user_id || !followed_user ){
      return res.status(404).json({message: "User with given id does not exists"})
    }
    const updated_authenticated_user = await User.findByIdAndUpdate(
      authenticated_user_id,
      {following: authenticated_user.following + 1},
      {new: true}
    );
    // console.log("New auth user following count: ", updated_authenticated_user.following)
  
    // console.log("Old followed user, followers count: ", followed_user.followers);
    const updated_followed_user = await User.findByIdAndUpdate(
      followed_user_id,
      {followers: followed_user.followers + 1},
      {new: true}
    );
    // console.log("New followed user, following count: ", updated_followed_user.followers);
    
    res.status(200).json({message: `${followed_user.name} followed`, user: {name: updated_followed_user.name, followers: updated_followed_user.followers}})
  }catch(error){
    res.status(500).json({message: 'Something went wrong in server'});
  }
})

export default router