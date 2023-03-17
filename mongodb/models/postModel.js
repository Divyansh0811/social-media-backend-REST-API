import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title:{
    type: String,
    required: [true, 'Please add a title']
  },
  description:{
    type: String,
    required: [true, 'Please add an description'],
    unique: true
  },
  likes:{
    type: Number,
    default: 0
  },
  comments: [
    {
      username: String,
      text: String,
    },
  ],
},
{
  timestamps: true
});

const PostSchema = mongoose.model('Post', postSchema);
export default PostSchema;
