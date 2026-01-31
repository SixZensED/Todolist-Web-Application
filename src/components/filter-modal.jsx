import React from 'react';

const FilterModal = ({ isOpen, onClose, activeFilter, onFilterChange }) => {
    if (!isOpen) return null;

    const filterOptions = [
        { id: 'all', label: 'All Task' },
        { id: 'completed', label: 'Completed Task' },
        { id: 'uncompleted', label: 'Uncompleted Task' },
        { id: 'pastdue', label: 'Past due' }
    ];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content filter-modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Filters</h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="filter-options">
                    {filterOptions.map(option => (
                        <div
                            key={option.id}
                            className={`filter-option-row ${activeFilter === option.id ? 'active' : ''}`}
                            onClick={() => {
                                onFilterChange(option.id);
                                onClose();
                            }}
                        >
                            <div className={`filter-checkbox ${activeFilter === option.id ? 'checked' : ''}`}>
                                {activeFilter === option.id && <img src="/images/CheckIcon.png" alt="Checked" style={{ width: 12, height: 12 }} />}
                            </div>
                            <span className="filter-label">{option.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
