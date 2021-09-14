const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

connectDB();

app.use(bodyParser.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/adhar', require('./routes/api/adhar'));
app.use('/api/link', require('./routes/api/linking'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/home', require('./routes/api/home'));
app.use('/api/pan', require('./routes/api/pan'));
app.use('/api/voter', require('./routes/api/voter'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log("Server started on port " +  PORT));
