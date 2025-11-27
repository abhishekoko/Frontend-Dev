import React from 'react';

const Sidebar = ({ currentView, onViewChange }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-icon">🎓</div>
                <h1>EduManager</h1>
            </div>

            <nav className="sidebar-nav">
                <button
                    className={`nav-item ${currentView === 'list' ? 'active' : ''}`}
                    onClick={() => onViewChange('list')}
                >
                    <span className="nav-icon">📊</span>
                    Dashboard
                </button>
                <button
                    className={`nav-item ${currentView === 'form' ? 'active' : ''}`}
                    onClick={() => onViewChange('form')}
                >
                    <span className="nav-icon">👥</span>
                    Add Student
                </button>
                <div className="nav-divider"></div>
                <button className="nav-item">
                    <span className="nav-icon">⚙️</span>
                    Settings
                </button>
            </nav>

            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="user-avatar">AD</div>
                    <div className="user-details">
                        <span className="user-name">Admin User</span>
                        <span className="user-role">Administrator</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
