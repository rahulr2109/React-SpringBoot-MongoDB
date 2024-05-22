import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentForm = ({ student, setStudent, fetchStudents }) => {
  const [name, setName] = useState(student ? student.name : '');
  const [email, setEmail] = useState(student ? student.email : '');
  const [course, setCourse] = useState(student ? student.course : '');

  useEffect(() => {
    if (student) {
      setName(student.name);
      setEmail(student.email);
      setCourse(student.course);
    }
  }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (student) {
      await axios.put(`http://localhost:8080/api/students`, { ...student, name, email, course });
    } else {
      await axios.post('http://localhost:8080/api/students', { name, email, course });
    }
    setStudent(null);
    fetchStudents();
    setName('');
    setEmail('');
    setCourse('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">{student ? 'Update Student' : 'Add Student'}</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="course" className="block text-gray-700 font-semibold mb-2">Course</label>
        <input
          type="text"
          id="course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Course"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        {student ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
};

export default StudentForm;
