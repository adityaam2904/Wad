const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://adityaam2904:Cdplus10@cluster0.8kcwlxp.mongodb.net/Student")

// Mongoose model
const StudentSchema = mongoose.model('Student', new mongoose.Schema({
  name: String,
  rollNo: Number,
  course: String,
  year: Number,
  email: String
}));



 // Routes

// GET all students
app.get('/students', async (req, res) => {
    try {
      const students = await StudentSchema.find();
      res.status(200).send(students);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch students', details: err.message });
    }
  });
  
  
  // POST new student
  app.post('/students', async (req, res) => {
    try {
      const newStudent = new StudentSchema(req.body);
      await newStudent.save();
      res.status(201).json(newStudent);
    } catch (err) {
      res.status(400).json({ error: 'Failed to create student', details: err.message });
    }
  });
  

// PUT update student
app.put('/Update-student/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(" Update Request Body:", req.body); 

    const { name, rollNo, course, year, email } = req.body;

    const student = await StudentSchema.findByIdAndUpdate(id, {
      name,
      rollNo,
      course,
      year,
      email
    }, { new: true });

    console.log("Updated student:", student); 

    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (err) {
    console.error(" Update error:", err); 
    res.status(500).json({ error: err.message });
  }
});

// DELETE student
app.delete('/Removestudent/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get student ID
        await StudentSchema.findByIdAndDelete(id); // Delete by ID
        res.status(200).json({ message: 'Student deleted successfully' }); // Success
    } catch (err) {
        res.status(500).json({ error: err.message }); // Error
    }
});

  

// Start server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));