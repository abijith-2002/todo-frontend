import React, { useMemo, useRef, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { makeId } from '../utils/id';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import FilterBar from './FilterBar';
import StatsBar from './StatsBar';

/**
 * Types
 * @typedef {'all'|'active'|'completed'} Filter
 * @typedef {{ id: string, title: string, completed: boolean, createdAt: number, updatedAt: number }} Task
 */

// PUBLIC_INTERFACE
export default function TodoApp() {
  /**
   * Top-level container for Todo management.
   * - Holds the canonical tasks state (persisted via localStorage)
   * - Holds the active filter (persisted via localStorage)
   * - Handles all mutations and announces actions to assistive tech
   */
  const [tasks, setTasks, tasksErr] = useLocalStorage('todo.tasks', /** @type {Task[]} */([]));
  const [filter, setFilter] = useLocalStorage('todo.filter', /** @type {Filter} */('all'));

  const [announcement, setAnnouncement] = useState('');
  const inputRef = useRef(null);

  const activeCount = useMemo(() => tasks.filter(t => !t.completed).length, [tasks]);
  const completedCount = useMemo(() => tasks.filter(t => t.completed).length, [tasks]);

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter(t => !t.completed);
    if (filter === 'completed') return tasks.filter(t => t.completed);
    return tasks;
  }, [tasks, filter]);

  function announce(msg) {
    setAnnouncement(msg);
    // Clear message after short delay so subsequent identical messages are announced
    window.clearTimeout(announce._t);
    announce._t = window.setTimeout(() => setAnnouncement(''), 700);
  }

  // PUBLIC_INTERFACE
  function addTask(title) {
    const trimmed = title.trim();
    if (!trimmed) return { ok: false, error: 'Please enter a task description.' };
    const now = Date.now();
    const task = { id: makeId(), title: trimmed, completed: false, createdAt: now, updatedAt: now };
    try {
      setTasks(prev => [task, ...prev]);
      announce(`Added task: ${trimmed}`);
      // focus the input for quick subsequent entries
      inputRef.current?.focus();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Failed to save task. Storage might be full.' };
    }
  }

  // PUBLIC_INTERFACE
  function updateTask(id, updates) {
    try {
      setTasks(prev =>
        prev.map(t => (t.id === id ? { ...t, ...updates, updatedAt: Date.now() } : t))
      );
      if (typeof updates.title === 'string') {
        announce('Task updated');
      }
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Failed to update task.' };
    }
  }

  // PUBLIC_INTERFACE
  function toggleTask(id) {
    try {
      setTasks(prev =>
        prev.map(t => (t.id === id ? { ...t, completed: !t.completed, updatedAt: Date.now() } : t))
      );
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Failed to toggle task.' };
    }
  }

  // PUBLIC_INTERFACE
  function deleteTask(id) {
    const task = tasks.find(t => t.id === id);
    try {
      setTasks(prev => prev.filter(t => t.id !== id));
      announce(`Deleted task${task?.title ? `: ${task.title}` : ''}`);
      // focus input for continued workflow
      inputRef.current?.focus();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Failed to delete task.' };
    }
  }

  // PUBLIC_INTERFACE
  function clearCompleted() {
    try {
      const remaining = tasks.filter(t => !t.completed);
      setTasks(remaining);
      announce('Cleared completed tasks');
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Failed to clear completed tasks.' };
    }
  }

  return (
    <section className="todo-card panel" aria-labelledby="app-title">
      {/* Live regions for screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" data-cy="live-announce">
        {announcement}
      </div>
      <div aria-live="polite" aria-atomic="true" className="sr-only" data-cy="live-stats">
        {activeCount} tasks left
      </div>

      {tasksErr && (
        <div role="alert" className="error-text" data-cy="storage-error">
          Storage error: {String(tasksErr)}
        </div>
      )}

      <div className="toolbar">
        <StatsBar
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />
        <FilterBar activeFilter={filter} onChange={setFilter} />
      </div>

      <TodoInput onAdd={addTask} inputRef={inputRef} />

      <div className="todo-list-wrap">
        {filteredTasks.length === 0 ? (
          <p className="todo-empty" data-cy="empty-state">
            No tasks {filter === 'active' ? 'to do' : filter === 'completed' ? 'completed' : 'yet'}. Add a new task above.
          </p>
        ) : (
          <TodoList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        )}
      </div>
    </section>
  );
}
