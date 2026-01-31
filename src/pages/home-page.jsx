import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoCard from '../components/todo-card';
import TodoList from '../components/todo-list';
import TodoModal from '../components/todo-modal';
import FilterModal from '../components/filter-modal';
import DeleteModal from '../components/delete-modal';

const HomePage = ({ tasks, setTasks, onUpdate }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const toggleTask = (taskId) => {
        // We update through parent or local clone if we had setTask here, 
        // but props are just 'tasks'. We need 'onUpdate' or 'setTasks' from parent to really work best.
        // Let's assume passed 'setTasks' works like 'setState' hook from parent.
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleCreateTask = (newTask) => {
        const taskWithId = { ...newTask, id: Date.now() };
        setTasks([taskWithId, ...tasks]);
    };

    const openDeleteModal = (task) => {
        setTaskToDelete(task);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        setIsDeleteModalOpen(false);
        setTaskToDelete(null);
    };

    const handleEditTask = (task) => {
        navigate(`/edit/${task.id}`);
    };

    const filteredTasks = tasks.filter(task => {
        // Search filter
        const matchesSearch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        // Category filter
        if (activeFilter === 'completed') return task.completed;
        if (activeFilter === 'uncompleted') return !task.completed;
        if (activeFilter === 'pastdue') {
            return task.date && task.date !== 'Tomorrow' && !task.completed;
        }
        return true;
    });

    // Rename components for JSX as requested if they were lowercase
    const TodoCardComponent = TodoCard;
    const TodoListComponent = TodoList;

    return (
        <>
            <TodoCardComponent
                onOpenModal={() => setIsModalOpen(true)}
                onOpenFilter={() => setIsFilterModalOpen(true)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            >
                <TodoListComponent
                    tasks={filteredTasks}
                    onToggle={toggleTask}
                    onDelete={openDeleteModal}
                    onEdit={handleEditTask}
                />
            </TodoCardComponent>

            <TodoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateTask}
            />

            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                task={taskToDelete}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default HomePage;
