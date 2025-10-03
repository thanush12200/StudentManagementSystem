const Student = require('./models/Student');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use(express.json());


async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://thanush:thanush2004@scooplabs.ns437im.mongodb.net/"
    );
    console.log("Connected to MongoDB Atlas!");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

connectDB();




app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(
      {
        success: true,
        message : "getting all students data",
        students: students
      }
    )
  } catch (error) {
    res.status(400).json(
      {
        success:false,
        message: "error getting all students",
        error : error
      }
    );
  }
});


app.post('/api/student', async (req,res) =>{
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.status(201).json({
            success: true,
            message: "student created successfully!",
            data: savedStudent,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error creating student",
            error: error.message,
        });
    }
});


app.put('/api/students/:id', async (req, res) => {
  try {
    const { name, age } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age },
      { new: true } 
    );
    if (!updatedStudent) 
      return res.status(404).json({ message: 'Student not found' });
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.delete('/api/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});


app.listen(PORT, () => {
  console.log('app is running in port',PORT);
});