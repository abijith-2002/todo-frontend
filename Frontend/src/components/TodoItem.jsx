import React, { useEffect, useRef, useState } from 'react';

/**
 * Props:
 * - task: Task
 * - onToggle: (id: string) => { ok: boolean }
 * - onUpdate: (id: string, updates: Partial<Task>) => { ok: boolean }
 * - onDelete: (id: string) => { ok: boolean }
 */
export default function TodoItem({ task, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const editRef = useRef(null);

  useEffect(() => {
    if (editing) {
      editRef.current?.focus?.();
      editRef.current?.select?.();
    }
  }, [editing]);

  function handleSave() {
    const title = draft.trim();
    if (!title) {
      // Empty -> delete for convenience, otherwise cancel
      setEditing(false);
      setDraft(task.title);
      return;
    }
    if (title !== task.title) {
      onUpdate(task.id, { title });
    }
    setEditing(false);
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setEditing(false);
      setDraft(task.title);
    }
  }

  return (
    <>
      <input
        id={`chk-${task.id}`}
        className="checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'active' : 'completed'}`}
        data-cy="todo-toggle"
      />

      {!editing ? (
        <p
          className={`todo-title ${task.completed ? 'completed' : ''}`}
          aria-label={task.title}
          data-cy="todo-title"
        >
          {task.title}
        </p>
      ) : (
        <input
          ref={editRef}
          type="text"
          className="edit-input"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={handleSave}
          aria-label="Edit task"
          data-cy="todo-edit-input"
        />
      )}

      <div className={editing ? 'edit-actions' : 'todo-actions'}>
        {!editing ? (
          <>
            <button
              className="btn btn-ghost"
              onClick={() => setEditing(true)}
              aria-label={`Edit "${task.title}"`}
              data-cy="btn-edit"
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(task.id)}
              aria-label={`Delete "${task.title}"`}
              data-cy="btn-delete"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              className="btn"
              onClick={handleSave}
              aria-label="Save edit"
              data-cy="btn-save"
            >
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setEditing(false);
                setDraft(task.title);
              }}
              aria-label="Cancel edit"
              data-cy="btn-cancel"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </>
  );
}
