import React from 'react';

const getGradeClass = (grade) => {
    const g = grade.toUpperCase();
    if (g.includes('A+')) return 'grade-A-plus';
    if (g.includes('A')) return 'grade-A';
    if (g.includes('B')) return 'grade-B';
    if (g.includes('C')) return 'grade-C';
    if (g.includes('D')) return 'grade-D';
    return 'grade-F';
};

const StudentList = ({ students, searchTerm, onSearch, onLoad, onAdd, onEdit, onDelete, onView }) => {
    return (
        <div className="student-list-container">
            <div className="list-header">
                <h2>Student Records</h2>
                <div className="header-actions">
                    <div className="search-bar">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by Name or Section..."
                            value={searchTerm}
                            onChange={(e) => onSearch(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <div className="action-buttons">
                        <button className="btn btn-primary" onClick={onLoad}>Load Students</button>
                        <button className="btn btn-success" onClick={onAdd}>Add Student</button>
                    </div>
                </div>
            </div>

            <div className="table-wrapper">
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Section</th>
                            <th>Marks</th>
                            <th>Grade</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="no-data">No students loaded. Click "Load Students" to fetch data.</td>
                            </tr>
                        ) : (
                            students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.section}</td>
                                    <td>{student.marks}</td>
                                    <td>
                                        <span className={`grade-badge ${getGradeClass(student.grade)}`}>
                                            {student.grade}
                                        </span>
                                    </td>
                                    <td className="actions-cell">
                                        <button className="btn btn-info btn-sm" onClick={() => onView(student)}>View</button>
                                        <button className="btn btn-warning btn-sm" onClick={() => onEdit(student)}>Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => onDelete(student.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;
