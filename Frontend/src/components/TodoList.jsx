import React from 'react';
import TodoItem from './TodoItem';

/**
 * Props:
 * - tasks: Task[]
 * - onToggle: (id: string) => void
 * - onUpdate: (id: string, updates: Partial<Task>) => void
 * - onDelete: (id: string) => void
 */
export default function TodoList({ tasks, onToggle, onUpdate, onDelete }) {
  return (
    <ul className="todo-list" role="list" aria-label="Todo items" data-cy="todo-list">
      {tasks.map(task => (
        <li key={task.id} role="listitem" className="todo-item" data-cy="todo-item">
          <TodoItem
            task={task}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}
