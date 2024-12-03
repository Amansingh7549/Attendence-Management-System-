const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Middleware
app.use(bodyParser.json());

// Database Connection
mongoose.connect('mongodb://localhost:27017/attendanceDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Teacher Schema
const teacherSchema = new mongoose.Schema({
    name: String,
    email: String
});
const Teacher = mongoose.model('Teacher', teacherSchema);

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
    date: String,
    teacherId: mongoose.Schema.Types.ObjectId,
    status: String
});
const Attendance = mongoose.model('Attendance', attendanceSchema);

// Routes
app.post('/teachers', async (req, res) => {
    const newTeacher = new Teacher(req.body);
    await newTeacher.save();
    res.json(newTeacher);
});

app.get('/teachers', async (req, res) => {
    const teachers = await Teacher.find();
    res.json(teachers);
});

app.post('/attendance', async (req, res) => {
    await Attendance.insertMany(req.body);
    res.json({ message: 'Attendance recorded' });
});

app.get('/attendance', async (req, res) => {
    const records = await Attendance.find().populate('teacherId', 'name');
    res.json(records);
});

// Start Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
