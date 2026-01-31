import React from 'react';

const todo_controls = ({ onAddTask, onOpenFilter, searchQuery, onSearchChange }) => {
    return (
        <div className="todo-controls">
            <button className="new-task-btn" onClick={onAddTask}>
                <span className="plus-icon">+</span> New Task
            </button>
            <div className="search-container">
                <div className="search-input-wrapper">
                    <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    <div className="shortcut-hint">
                        <img src="/images/Bind.png" alt="Command" className="cmd-icon" /> K
                    </div>
                </div>
                <button className="filter-btn" onClick={onOpenFilter}>
                    <img src="/images/Filter.png" alt="Filter" className="filter-icon" />
                </button>
            </div>
        </div>
    );
};

export default todo_controls;
