import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import { getAllStudents, addStudent, updateStudent, deleteStudent } from './services/studentService';

import DashboardStats from './components/DashboardStats';
import Sidebar from './components/Sidebar';

function App() {
  const [students, setStudents] = useState([]);
  const [view, setView] = useState('list'); // 'list', 'form', 'details'
  const [currentStudent, setCurrentStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setCurrentStudent(null);
    setView('form');
    setError(null);
  };

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setView('form');
    setError(null);
  };

  const handleViewClick = (student) => {
    setCurrentStudent(student);
    setView('details');
    setError(null);
  };

  const handleDeleteClick = async (id) => {
    console.log("Delete clicked for ID:", id); // Debugging
    if (window.confirm('Are you sure you want to delete this student?')) {
      setLoading(true);
      try {
        await deleteStudent(id);
        console.log("Delete successful for ID:", id); // Debugging
        alert('Student deleted successfully! Please click "Load Students" to refresh.');
        // Per requirements: "After adding/editing/deleting → show an alert and let them click the 'Load Students' button again"
        // So we don't auto-reload here.
        setView('list');
      } catch (err) {
        console.error("Delete failed:", err); // Debugging
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFormSubmit = async (studentData) => {
    setLoading(true);
    try {
      if (currentStudent) {
        await updateStudent(currentStudent.id, studentData);
        alert('Student updated successfully! Please click "Load Students" to refresh.');
      } else {
        await addStudent(studentData);
        alert('Student added successfully! Please click "Load Students" to refresh.');
      }
      setView('list');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setView('list');
    setError(null);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar currentView={view} onViewChange={(newView) => {
        if (newView === 'form') handleAddClick();
        else setView(newView);
      }} />

      <main className="main-content">
        <header className="top-bar">
          <h2 className="page-title">
            {view === 'list' && 'Dashboard Overview'}
            {view === 'form' && (currentStudent ? 'Edit Student' : 'Add New Student')}
            {view === 'details' && 'Student Details'}
          </h2>
        </header>

        <div className="content-area">
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="loading-spinner">Loading...</div>}

          {view === 'list' && (
            <>
              <DashboardStats students={students} />
              <StudentList
                students={filteredStudents}
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                onLoad={handleLoadStudents}
                onAdd={handleAddClick}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                onView={handleViewClick}
              />
            </>
          )}

          {view === 'form' && (
            <StudentForm
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
              initialData={currentStudent}
            />
          )}

          {view === 'details' && (
            <StudentDetails
              student={currentStudent}
              onBack={() => setView('list')}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
