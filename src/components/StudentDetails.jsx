import React from 'react';

const StudentDetails = ({ student, onBack }) => {
    if (!student) return null;

    return (
        <div className="details-card">
            <div className="list-header">
                <h2>Student Details</h2>
            </div>

            <div className="detail-rows-container">
                <div className="detail-row">
                    <strong>ID:</strong> <span>{student.id}</span>
                </div>
                <div className="detail-row">
                    <strong>Name:</strong> <span>{student.name}</span>
                </div>
                <div className="detail-row">
                    <strong>Section:</strong> <span>{student.section}</span>
                </div>
                <div className="detail-row">
                    <strong>Marks:</strong> <span>{student.marks}</span>
                </div>
                <div className="detail-row">
                    <strong>Grade:</strong>
                    <span className={`grade-badge ${student.grade.includes('A') ? 'grade-A' : student.grade.includes('B') ? 'grade-B' : student.grade.includes('C') ? 'grade-C' : student.grade.includes('D') ? 'grade-D' : 'grade-F'}`}>
                        {student.grade}
                    </span>
                </div>
            </div>

            <div className="form-actions" style={{ marginTop: '2rem' }}>
                <button className="btn btn-secondary" onClick={onBack}>Back to List</button>
            </div>
        </div>
    );
};

export default StudentDetails;
