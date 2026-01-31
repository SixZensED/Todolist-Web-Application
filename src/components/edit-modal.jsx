import React, { useState, useEffect } from 'react';

const EditModal = ({ isOpen, onClose, task, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
            setDate(task.date || '');
        }
    }, [task]);

    if (!isOpen || !task) return null;

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        onUpdate({
            ...task,
            title,
            description,
            date
        });
        setIsEditing(false);
        onClose();
    };

    const handleEditClick = () => {
        if (isEditing) {
            handleSubmit();
        } else {
            setIsEditing(true);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content edit-modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="edit-modal-body">
                    {isEditing ? (
                        <input
                            type="text"
                            className="modal-title-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                    ) : (
                        <h2 className="edit-modal-title">{title}</h2>
                    )}

                    {isEditing ? (
                        <textarea
                            className="modal-desc-input edit-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description (Optional)"
                        />
                    ) : (
                        <p className="edit-modal-description">{description || "No description provided."}</p>
                    )}

                    <div className="modal-footer">
                        <div className="modal-date-picker">
                            <span className="calendar-icon-mask" style={{ width: 18, height: 18 }}></span>
                            <span className="due-label">Nearly due</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="modal-date-input"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            ) : (
                                <span className="modal-date-display">{date || "No date set"}</span>
                            )}
                        </div>
                        <button
                            className="edit-task-btn"
                            onClick={handleEditClick}
                        >
                            <img src="/images/Edit.png" alt="Edit" className="edit-btn-icon" />
                            {isEditing ? "Save Changes" : "Edit Task"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
