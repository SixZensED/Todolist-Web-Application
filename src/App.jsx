import React, { useState } from 'react';
import './App.css';
import TodoCard from './components/todo-card';
import TodoList from './components/todo-list';
import TodoModal from './components/todo-modal';
import FilterModal from './components/filter-modal';
import DeleteModal from './components/delete-modal';
import EditModal from './components/edit-modal';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Finish Website Design',
      description: 'Design To-do-list with Figma',
      date: 'Tomorrow',
      completed: false
    },
    {
      id: 2,
      title: 'Making Website with Next.js',
      description: 'Create Website To-do-list With Next.js and Deployment to vercel.app',
      date: 'Dec 28, 2026',
      completed: false
    },
    {
      id: 3,
      title: 'Breakfast Eating',
      description: '',
      date: '',
      completed: true
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTask = (taskId) => {
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

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
    setIsEditModalOpen(false);
    setTaskToEdit(null);
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
          onEdit={openEditModal}
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

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={taskToEdit}
        onUpdate={handleUpdateTask}
      />
    </>
  );
}

export default App;
