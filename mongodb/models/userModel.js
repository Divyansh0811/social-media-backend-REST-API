import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Please add a name']
  },
  email:{
    type: String,
    required: [true, 'Please add an email'],
    unique: true
  },
  password:{
    type: String,
    required: [true, 'Please add a password']
  },
  token: {
    type: String,
    required: [true, 'Please authenticate the user']
  },
  followers: {
    type: Number,
    default: 0
  },
  following: {
    type: Number,
    default: 0
  }
},
{
  timestamps: true
});

const UserSchema = mongoose.model('User', userSchema);
export default UserSchema;
