import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Anton Volkov!!!!');
});
app.post('/auth/login', (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});
app.listen(4444, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('Server starts at PORT 4444');
});
