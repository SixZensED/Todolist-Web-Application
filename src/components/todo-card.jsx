import React from 'react';
import TodoHeader from './todo-header';
import TodoControls from './todo-controls';
import TodoList from './todo-list';

const todo_card = ({ children, onOpenModal, onOpenFilter, searchQuery, onSearchChange }) => {
    // Rename for JSX
    const TodoHeaderComponent = TodoHeader;
    const TodoControlsComponent = TodoControls;

    return (
        <div className="todo-card">
            <div className="noise-overlay"></div>
            <div className="card-content">
                <TodoHeaderComponent />
                <TodoControlsComponent
                    onAddTask={onOpenModal}
                    onOpenFilter={onOpenFilter}
                    searchQuery={searchQuery}
                    onSearchChange={onSearchChange}
                />
                {children}
            </div>
        </div>
    );
};

export default todo_card;
