import React, { useState, useEffect } from 'react';

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '30px',
};

const formStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '15px',
  justifyContent: 'center',
  maxWidth: '800px',
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const inputStyle = {
  flex: '1 1 200px',
  minWidth: '150px',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '12px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  fontSize: '16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  alignSelf: 'center',
};

const headingStyle = {
  width: '100%',
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const StudentForm = ({ onSubmit, editingStudent }) => {
  const [student, setStudent] = useState({
    name: '',
    rollNo: '',
    course: '',
    year: '',
    email: ''
  });

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingStudent) {
      const updatedStudent = { ...student, _id: editingStudent._id };
      onSubmit(editingStudent._id, updatedStudent);
    } else {
      onSubmit(student);
    }

    setStudent({ name: '', rollNo: '', course: '', year: '', email: '' });
  };
  
  return (
    <div style={wrapperStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3 style={headingStyle}>{editingStudent ? 'Edit Student' : 'Add Student'}</h3>
        <input
          style={inputStyle}
          type="text"
          name="name"
          value={student.name}
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="number"
          name="rollNo"
          value={student.rollNo}
          placeholder="Roll No"
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="text"
          name="course"
          value={student.course}
          placeholder="Course"
          onChange={handleChange}
        />
        <input
          style={inputStyle}
          type="number"
          name="year"
          value={student.year}
          placeholder="Year"
          onChange={handleChange}
        />
        <input
          style={inputStyle}
          type="email"
          name="email"
          value={student.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <button style={buttonStyle} type="submit">
          {editingStudent ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
