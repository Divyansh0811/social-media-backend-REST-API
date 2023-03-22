import express from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import User from '../../mongodb/models/userModel.js';

dotenv.config();
const router = express.Router();
/*
  Description: Get all users information
  Route: GET /api/user
  Access: Public
*/
router.route('/').get(async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
      return res.status(404).json({message: "User with given email does not exists"});
    }
    // console.log("User password: ", user.password)
    if(password !== user.password){
      res.status(401).json({message: 'Wrong password!'});
    }
    const token = generateToken(user._id);
    // console.log("Token: ", token)
    const { _id, name, followers, following } = user;
    res.status(200).json({
      token: token,
      user: { _id, name, followers, following },
      message: 'Logged in successfully!'
    })
  }catch(error){
    res.status(500).json({message: 'Something went wrong with server'});
  }
})

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

export default router;