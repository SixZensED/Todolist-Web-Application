import React from 'react';
import TodoItem from './todo-item';

const todo_list = ({ tasks, onToggle, onDelete }) => {
    // Rename for JSX
    const TodoItemComponent = TodoItem;

    return (
        <div className="todo-list">
            {tasks.map((task, index) => (
                <TodoItemComponent
                    key={task.id || index}
                    {...task}
                    onToggle={() => onToggle(task.id)}
                    onDelete={() => onDelete(task)}
                />
            ))}
        </div>
    );
};

export default todo_list;
