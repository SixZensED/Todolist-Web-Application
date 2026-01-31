import React from 'react';

const todo_header = () => {
    return (
        <div className="todo-header">
            <div className="todo-header-icon">
                <img src="/images/Logo.png" alt="Logo" className="header-logo" />
            </div>
            <h1 className="todo-header-title">To Do List</h1>
        </div>
    );
};

export default todo_header;
