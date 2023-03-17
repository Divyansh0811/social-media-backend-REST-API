import express from 'express';
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs/dist/bcrypt.js'
import jwt from 'jsonwebtoken'
import User from '../../mongodb/models/userModel.js';

dotenv.config()

const router = express.Router();
/*
POST /api/authenticate
Perform user authentication and return a jwt token
input: email and password
output: jwt token
*/
router.route('/').post(async (req, res) => {
  try{
    const { email, password } = req.body;
    if(!email || !password){
      res.status(404).json({err: 'Please fill out all the fields'});
    }
    
    const userAlreadyExists = await User.findOne({ email })
    if(userAlreadyExists){
      res.json({ token: userAlreadyExists.token })
    }else{
      res.status(401).json({message: 'Invalid Email or password, please use any of one email (dummy@example.com, user1@example.com, user2@example.com) and password = {abc}'})
    }
  }catch(error){
    res.status(500).json({message: 'Something went wrong with server'});
  }
})

export default router;