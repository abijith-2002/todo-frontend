import { useCallback, useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * useLocalStorage
 * A resilient hook that syncs state to localStorage with:
 * - lazy initialization from storage (with JSON parsing)
 * - safe writes with error capture
 * - cross-tab synchronization using the 'storage' event
 *
 * @param {string} key localStorage key
 * @param {any} initialValue default value if storage is empty or invalid
 * @returns {[any, (updater: (prev: any) => any | any) => void, string | null]}
 *          value, setValue, errorMessage
 */
export default function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(readValue);
  const [error, setError] = useState(null);

  const writeValue = useCallback((valueOrFn) => {
    try {
      const newValue = valueOrFn instanceof Function ? valueOrFn(storedValue) : valueOrFn;
      setStoredValue(newValue);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
      setError(null);
    } catch (e) {
      setError(e?.message || 'Failed to access localStorage.');
    }
  }, [key, storedValue]);

  // Cross-tab synchronization
  useEffect(() => {
    function handleStorage(event) {
      if (event.key === key) {
        try {
          setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
        } catch {
          // ignore parse errors, fallback to initial
          setStoredValue(initialValue);
        }
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, initialValue]);

  // Keep state in sync if key or initialValue changes
  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, writeValue, error];
}
