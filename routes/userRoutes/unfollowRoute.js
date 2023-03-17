import express from 'express';
import User from '../../mongodb/models/userModel.js';
import protect  from '../../middlewares/authenticateUser.js'

const router = express.Router();
/*
  Description: Unfollow user with params id
  Route: POST /api/unfollow/id
  Access: Private
*/
router.route('/:id').post(protect, async (req, res) => {
  const authenticated_user_id = req.user.id;
  const authenticated_user = await User.findById(authenticated_user_id);

  if(!authenticated_user){
    return res.status(401).json({message: "Please authenticate the user using token on /api/authenticate"})
  }
  const unfollowed_user_id = req.params.id;
  const unfollowed_user = await User.findById(unfollowed_user_id);
  if(!unfollowed_user){
    res.status(404).json({message: "User with given id does not exists"})
  }
  const updated_authenticated_user = await User.findByIdAndUpdate(
    authenticated_user,
    {following: authenticated_user.following - 1},
    {new: true}
  );

  const updated_unfollowed_user = await User.findByIdAndUpdate(
    unfollowed_user_id,
    {followers: unfollowed_user.followers - 1},
    {new: true}
  );

  res.status(200).json({message: `${updated_unfollowed_user.name} unfollowed`, 
    user: {
      name: updated_unfollowed_user.name,
      followers: updated_unfollowed_user.followers
    }

  })
})

export default router