import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import {
  registerValidator,
  loginValidator,
  postCreateValidation,
} from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose
  .connect(
    'mongodb+srv://antvolkov84:G8SdLeNkI72eyvsq@cluster0.am3t6sl.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('DB ok!'))
  .catch((err) => console.log('DB Error ', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.post(
  '/auth/login',
  loginValidator,
  handleValidationErrors,
  UserController.login
);
app.post(
  '/auth/register',
  registerValidator,
  handleValidationErrors,
  UserController.register
);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  handleValidationErrors,
  PostController.update
);

app.listen(4444, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('Server starts at PORT 4444');
});
