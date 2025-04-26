import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const App = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
 
  const fetchStudents = async () => {
    const res = await axios.get('http://localhost:5000/students');
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (student) => {
    await axios.post('http://localhost:5000/students', student);
    fetchStudents();
  };

  const updateStudent = async (id, student) => {
    try {
      await axios.put(`http://localhost:5000/Update-student/${id}`, student);
      console.log(" Student updated");
      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      console.error(" Update failed", err);
    }
  };
  
  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/Removestudent/${id}`);
    fetchStudents();
  };
  return (
    <div className="container">
      <h1>Student Management</h1>
      <StudentForm 
        onSubmit={editingStudent ? updateStudent : addStudent}
        editingStudent={editingStudent}
      />
      <StudentList 
        students={students} 
        onEdit={setEditingStudent}
        onDelete={deleteStudent}
      />
    </div>
  );
};

export default App;
