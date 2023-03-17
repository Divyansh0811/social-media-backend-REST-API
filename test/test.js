import assert from 'assert';
import mongoose from 'mongoose';
import Post from '../mongodb/models/postModel.js';
import User from '../mongodb/models/userModel.js';
import chai from 'chai';
import chaiHttp from 'chai-http';  
import app from '../index.js'

chai.use(chaiHttp);
var expect = chai.expect;


const user1 = {
 "_id": "64134d8570e412fe87c4f379",
  "name": "dummy",
  "email": "dummy@example.com",
  "password": "abc",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1bW15QGV4YW1wbGUuY29tIiwiaWF0IjoxNjc4OTg2NjI5fQ.XjCj6RNRap0HrX6qPxoV6yHa4RD42j7hXH_wV_ywkl4"
}
const user2 = {
  "_id": "64134d8070e412fe87c4f377",
   "name": "user1",
   "email": "user1@example.com",
   "password": "abc",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiaWF0IjoxNjc4OTg2NjI0fQ.26zX9O7nOU9i3n6wZbYOuCKcckP3IbYOcQZXx0Y6wPQ"
 }

  it('Verify token of the user', async () => {
    const email = user2.email;
    const password = user2.password;
    const token = user2.token;
    const res = await User.findOne({ email });
    // console.log("Res: ", res);
    chai.expect(res.token).to.equal(token);
  });

  it('Should create a new post for authenticated user', async () => {

    const new_post = {
      "user": user2,
      "title" : "New post2 for user1",
      "description" : "New Post description for new post2 1 user1"
    }

    const res = await Post.create(new_post);
    // console.log(res);
    chai.expect(res.title).to.equal(new_post.title); // If we are getting res.title it means that query was successfull
  })

  it('Should not create a post with title missing', function(done) { // <= Pass in done callback
    const new_post = {
      "user": user2,
      "description" : "Post description for new post 1 user1"
    }
    chai.request('http://localhost:8080')
    .get('/api/posts')
    .send(new_post)
    .end(function(err, res) {
      chai.expect(res).to.have.status(404);
      done();                               // <= Call done to signal callback end
    });
  });

