import React from 'react';

/**
 * Props:
 * - activeFilter: 'all' | 'active' | 'completed'
 * - onChange: (filter) => void
 */
export default function FilterBar({ activeFilter, onChange }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div
      className="filters"
      role="toolbar"
      aria-label="Filter tasks"
      data-cy="filter-bar"
    >
      {filters.map(f => (
        <button
          key={f.key}
          className="btn btn-secondary btn-filter"
          aria-pressed={activeFilter === f.key}
          onClick={() => onChange(f.key)}
          data-cy={`filter-${f.key}`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
