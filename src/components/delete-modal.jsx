import React from 'react';

const DeleteModal = ({ isOpen, onClose, task, onConfirm }) => {
    if (!isOpen || !task) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content delete-modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="delete-modal-header">
                    <h2 className="delete-modal-title">Are you sure you want to delete ?</h2>
                    <p className="delete-modal-subtitle">This task will be deleted permanantly. You can't undo this action</p>
                </div>

                <div className="delete-task-info">
                    <h3 className="delete-task-title">{task.title}</h3>
                    <p className="delete-task-desc">{task.description || 'No description provided'}</p>
                </div>

                <div className="delete-modal-footer">
                    <button className="delete-confirm-btn" onClick={() => onConfirm(task.id)}>
                        <img src="/images/Delete.png" alt="Delete" className="delete-btn-icon" />
                        Delete Task
                    </button>
                    <button className="delete-cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
