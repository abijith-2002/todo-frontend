import React, { useEffect } from 'react';
import './App.css';
import TodoApp from './components/TodoApp';
import useLocalStorage from './hooks/useLocalStorage';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root component that provides:
   * - App-level theme toggle (persisted in localStorage)
   * - A skip link for accessibility
   * - Containers/styling for the Todo application
   */
  const [theme, setTheme] = useLocalStorage('todo.theme', 'light');

  useEffect(() => {
    if (theme && typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App" data-cy="app-root">
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="app-header" role="banner">
        <div className="container header-inner">
          <h1 className="app-title" id="app-title">Todo</h1>
          <button
            className="btn btn-secondary theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            data-cy="toggle-theme"
          >
            {theme === 'light' ? '🌙 Dark mode' : '☀️ Light mode'}
          </button>
        </div>
      </header>

      <main id="main" className="container" role="main">
        <TodoApp />
      </main>

      <footer className="app-footer" role="contentinfo">
        <div className="container footer-inner">
          <p className="muted">All data is stored locally in your browser for offline use.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
