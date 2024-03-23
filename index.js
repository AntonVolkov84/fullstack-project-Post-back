import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://antvolkov84:G8SdLeNkI72eyvsq@cluster0.am3t6sl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('DB ok!'))
  .catch((err) => console.log('DB Error ', err));

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Anton Volkov!!!!');
});
app.post('/auth/login', (req, res) => {
  console.log(req.body);
  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: 'Anton Volkov',
    },
    'secret123'
  );

  res.json({ success: true, token });
});
app.listen(4444, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('Server starts at PORT 4444');
});
