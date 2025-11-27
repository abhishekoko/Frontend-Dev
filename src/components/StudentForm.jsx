import React, { useState, useEffect } from 'react';

const StudentForm = ({ onSubmit, onCancel, initialData }) => {
    const [name, setName] = useState('');
    const [section, setSection] = useState('');
    const [marks, setMarks] = useState('');
    const [grade, setGrade] = useState('');

    // Populate form if editing
    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setSection(initialData.section);
            setMarks(initialData.marks);
            setGrade(initialData.grade);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            name,
            section,
            marks: Number(marks),
            grade
        });
    };

    return (
        <div className="form-container">
            <h2>{initialData ? 'Edit Student' : 'Add Student'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Section:</label>
                    <input
                        type="text"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Marks:</label>
                    <input
                        type="number"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Grade:</label>
                    <input
                        type="text"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
