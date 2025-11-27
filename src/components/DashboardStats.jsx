import React, { useMemo } from 'react';

const DashboardStats = ({ students }) => {
    const stats = useMemo(() => {
        if (!students || students.length === 0) {
            return {
                totalStudents: 0,
                passRate: 0
            };
        }

        const totalStudents = students.length;

        const passedStudents = students.filter(s => s.grade !== 'F').length;
        const passRate = Math.round((passedStudents / totalStudents) * 100);

        return {
            totalStudents,
            passRate
        };
    }, [students]);

    return (
        <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                    <h3>Total Students</h3>
                    <p>{stats.totalStudents}</p>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                    <h3>Pass Rate</h3>
                    <p>{stats.passRate}%</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
