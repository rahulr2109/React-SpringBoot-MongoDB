import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';

const HomePage = () => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get('http://localhost:8080/api/students');
    setStudents(response.data);
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:8080/api/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <h1 className="text-center text-3xl font-bold">Student Management System</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <StudentForm student={student} setStudent={setStudent} fetchStudents={fetchStudents} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Student List</h2>
            <StudentList students={students} setStudent={setStudent} deleteStudent={deleteStudent} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
