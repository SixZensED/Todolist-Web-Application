import React, { useState } from 'react';

const TodoModal = ({ isOpen, onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('Jan 1 2026');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onCreate({
            title,
            description,
            date,
            completed: false
        });
        setTitle('');
        setDescription('');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Replace lightbulb tomorrow at 3pm"
                        className="modal-title-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />
                    <input
                        type="text"
                        placeholder="Description (Optional)"
                        className="modal-desc-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="modal-footer">
                        <div className="modal-date-picker">
                            <span className="calendar-icon-mask" style={{ width: 18, height: 18 }}></span>
                            <span className="due-label">Nearly due</span>
                            <input
                                type="text"
                                className="modal-date-input"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="modal-create-btn">
                            <span className="plus-icon">+</span> Create New Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TodoModal;
