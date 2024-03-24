import express from 'express';
import mongoose from 'mongoose';

import {
  registerValidator,
  loginValidator,
  postCreateValidation,
} from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose
  .connect(
    'mongodb+srv://antvolkov84:G8SdLeNkI72eyvsq@cluster0.am3t6sl.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('DB ok!'))
  .catch((err) => console.log('DB Error ', err));

const app = express();
app.use(express.json());

app.post('/auth/login', loginValidator, UserController.login);
app.post('/auth/register', registerValidator, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
// app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
// app.delete('/posts', PostController.remove)
// app.patch('/posts', PostController.update)

app.listen(4444, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('Server starts at PORT 4444');
});
