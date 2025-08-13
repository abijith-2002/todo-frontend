import React, { useEffect, useState } from 'react';

/**
 * Props:
 * - onAdd: (title: string) => { ok: boolean, error?: string }
 * - inputRef: React.RefObject<HTMLInputElement>
 */
export default function TodoInput({ onAdd, inputRef }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // autofocus on load for quick entry
    inputRef?.current?.focus?.();
  }, [inputRef]);

  function submit() {
    const res = onAdd(value);
    if (!res.ok) {
      setError(res.error || 'Could not add task.');
      return;
    }
    setValue('');
    setError('');
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    } else if (e.key === 'Escape') {
      setValue('');
      setError('');
    }
  }

  return (
    <div className="todo-input-row" role="form" aria-label="Add new task">
      <div>
        <label htmlFor="new-todo" className="sr-only">New task</label>
        <input
          id="new-todo"
          ref={inputRef}
          type="text"
          className={`input ${error ? 'input-error' : ''}`}
          placeholder="What needs to be done? (Press Enter to add)"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'new-todo-error' : undefined}
          data-cy="input-new-todo"
        />
        {error && (
          <div id="new-todo-error" className="error-text" role="alert" data-cy="input-error">
            {error}
          </div>
        )}
      </div>

      <button
        className="btn"
        onClick={submit}
        disabled={!value.trim()}
        aria-disabled={!value.trim()}
        data-cy="btn-add"
      >
        Add
      </button>
    </div>
  );
}
