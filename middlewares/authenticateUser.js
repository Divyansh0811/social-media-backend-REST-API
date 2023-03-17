import jwt from 'jsonwebtoken';
import User from '../mongodb/models/userModel.js';
import * as dotenv from 'dotenv';

dotenv.config();

const protect =  async (req, res, next) => {
  let token;
  // token format => Bearer 640d98f4098d(token)
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      token = req.headers.authorization.split(' ')[1]

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      //Get User from the token
      req.user = await User.findById(decoded.id).select('-password')
      //calling next piece of middleware if everything works fine uptill here
      next();
    } catch (error) {
      console.error(error)
      res.status(401).json({ message: 'Not Authorized'});
    }
  }

  //if no token at all
  if(!token){
    return res.status(401).json({message: "User not authorized"});
    
  }
};


export default protect