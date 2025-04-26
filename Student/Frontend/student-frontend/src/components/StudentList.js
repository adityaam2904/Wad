import React from 'react';

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const thTdStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'left',
};

const thStyle = {
  ...thTdStyle,
  backgroundColor: '#f2f2f2',
  fontWeight: 'bold',
};

const buttonStyle = {
  marginRight: '5px',
  padding: '6px 12px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const editButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#4CAF50',
  color: 'white',
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#f44336',
  color: 'white',
};

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <div>
      <h3>Student List</h3>
      {students.length === 0 ? (
        <p>No students available.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Roll No</th>
              <th style={thStyle}>Course</th>
              <th style={thStyle}>Year</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td style={thTdStyle}>{student.name}</td>
                <td style={thTdStyle}>{student.rollNo}</td>
                <td style={thTdStyle}>{student.course}</td>
                <td style={thTdStyle}>{student.year}</td>
                <td style={thTdStyle}>{student.email}</td>
                <td style={thTdStyle}>
                  <button style={editButtonStyle} onClick={() => onEdit(student)}>Edit</button>
                  <button style={deleteButtonStyle} onClick={() => onDelete(student._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
