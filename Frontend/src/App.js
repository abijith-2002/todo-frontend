import React, { useEffect } from 'react';
import './App.css';
import TodoApp from './components/TodoApp';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root component that provides:
   * - A skip link for accessibility
   * - Containers/styling for the Todo application
   * - Permanent dark theme styling
   */

  useEffect(() => {
    // Enforce dark theme permanently
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  return (
    <div className="App" data-cy="app-root">
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="app-header" role="banner">
        <div className="container header-inner">
          <h1 className="app-title" id="app-title">Todo</h1>
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
