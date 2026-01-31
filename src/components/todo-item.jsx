import React from 'react';

const todo_item = ({ title, description, date, completed, onToggle, onDelete }) => {
    return (
        <div className={`todo-item ${completed ? 'completed' : ''}`}>
            <div className="todo-item-check">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={onToggle}
                />
                <span className="checkmark"></span>
            </div>
            <div className="todo-item-content">
                <div className="todo-item-title-row">
                    <span className="todo-item-title">{title}</span>
                    {description && <span className="todo-item-description"> / {description}</span>}
                </div>
                {date && (
                    <div className="todo-item-date">
                        <span className="calendar-icon-mask" style={{ width: 16, height: 16 }}></span>
                        <span className="date-text">{date}</span>
                    </div>
                )}
            </div>
            <div className="todo-item-actions">
                <button className="action-btn edit-btn">
                    <img src="/images/Edit.png" alt="Edit" className="action-icon" />
                </button>
                <button className="action-btn delete-btn" onClick={onDelete}>
                    <img src="/images/Delete.png" alt="Delete" className="action-icon" />
                </button>
            </div>
        </div>
    );
};

export default todo_item;
