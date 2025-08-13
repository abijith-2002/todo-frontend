import React from 'react';

/**
 * Props:
 * - activeCount: number
 * - completedCount: number
 * - onClearCompleted: () => void
 */
export default function StatsBar({ activeCount, completedCount, onClearCompleted }) {
  return (
    <div className="stats" aria-live="polite">
      <span data-cy="stats-remaining">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>
      {completedCount > 0 && (
        <button
          className="btn btn-secondary"
          onClick={onClearCompleted}
          data-cy="btn-clear-completed"
        >
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}
