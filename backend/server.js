
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;


app.use(cors()); 
app.use(express.json()); 


let students = [
  { id: 1, name: 'Thanush', age: 21 },
  { id: 2, name: 'Pragna', age: 20 },
];



app.get('/api/students', (req, res) => {
  res.json(students);
});


