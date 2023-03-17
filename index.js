import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import connectDB from './mongodb/connect.js';
import autheticateRoute from './routes/userRoutes/autheticateRoute.js';
import userRoute from './routes/userRoutes/userRoute.js'
import followRoute from './routes/userRoutes/followRoute.js';
import unfollowRoute from './routes/userRoutes/unfollowRoute.js';
import postRoute from './routes/postroutes/postRoute.js'
import likepostRoute from './routes/postroutes/likepostRoute.js'
import unlikepostRoute from './routes/postroutes/unlikepostRoute.js'
import commentpostRoute from './routes/postroutes/commentpostRoute.js'
import allpostsRoute from './routes/postroutes/allpostsRoute.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
/*
POST /api/authenticate
POST /api/follow/{id}
POST /api/unfollow/{id}
GET /api/user
POST api/posts/
DELETE api/posts/{id}
POST /api/like/{id}
POST /api/unlike/{id}
POST /api/comment/{id}
GET api/posts/{id}
GET /api/all_posts
*/
app.use('/api/authenticate', autheticateRoute);
app.use('/api/user', userRoute)
app.use('/api/follow', followRoute)
app.use('/api/unfollow', unfollowRoute);
app.use('/api/posts', postRoute);
app.use('/api/like', likepostRoute);
app.use('/api/unlike', unlikepostRoute);
app.use('/api/comment', commentpostRoute);
app.use('/api/all_posts', allpostsRoute);

app.get('/', (req, res) => {
  res.status(200).json({message: 'Hi from Backend Assignment'});
})

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
  } catch (error) {
    console.log(error)
  }
}

startServer();

export default app