const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: 'myappdb.c3iuq8u6iyy3.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'AtulKamble5',
  database: 'myappdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to DB');
});

app.get('/', (req, res) => {
  res.send('Welcome to WebApp!');
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
