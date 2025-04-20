// Import required modules
const express = require('express'); // Express framework
const mongoose = require('mongoose'); // Mongoose for MongoDB interaction
const bodyParser = require('body-parser'); // Middleware to parse request bodies
const cors = require('cors'); // Enable Cross-Origin Resource Sharing

const app = express(); // Create an instance of Express app

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb+srv://kbtug22420:9zF1YopwT43Ao5kr@student.xnvgjeq.mongodb.net/");

// Define the schema for a Student document
const StudentSchema = new mongoose.Schema({
    name: String,  // Student's name
    marks: Number  // Student's marks
});

// Create a model for the Student schema
const Student = mongoose.model('Student', StudentSchema);

// Route: GET '/' - Home route
app.get('/', async (req, res) => {
    res.send("Welcome to Student Login"); // Send welcome message
});

// Route: GET '/student' - Get all students
app.get('/student', async (req, res) => {
    const students = await Student.find(); // Retrieve all student documents
    res.send(students); // Send student data as response
});

// Route: GET '/student/:name' - Get student(s) by name
app.get('/student/:name', async (req, res) => {
    const { name } = req.params; // Extract name from URL
    const students = await Student.find({ name }); // Find students by name
    res.send(students); // Send matching students
});


// Route: POST '/student' - Add a new student
app.post('/student', async (req, res) => {
    const { name, marks } = req.body; // Extract data from request

    try {
        const newStudent = new Student({ name, marks }); // Create new student
        await newStudent.save(); // Save to database
        res.status(201).send("Student added successfully"); // Success response
    } catch (error) {
        res.status(400).send("Error adding student"); // Error response
    }
});

// Route: PUT '/update-student/:id' - Update student by ID
app.put('/update-student/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get student ID from URL
        const { name, marks } = req.body; // Get new data

        // Update student by ID
        const student = await Student.findByIdAndUpdate(id, { name, marks }, { new: true });

        // Send success response
        res.status(200).json({ message: 'Student updated successfully', student });
    } catch (err) {
        res.status(500).json({ error: err.message }); // Error response
    }
});

// Route: DELETE '/delete-student/:id' - Delete student by ID
app.delete('/delete-student/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get student ID
        await Student.findByIdAndDelete(id); // Delete by ID
        res.status(200).json({ message: 'Student deleted successfully' }); // Success
    } catch (err) {
        res.status(500).json({ error: err.message }); // Error
    }
});

// Start the server on port 3000
app.listen(3000, (req, res) => {
    console.log("Server is Running on 3000"); // Log server start
});
