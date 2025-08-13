const rand = () => Math.random().toString(36).slice(2, 8);

/**
 * PUBLIC_INTERFACE
 * makeId
 * Generates a reasonably unique string identifier for tasks.
 * Combines time-based component with random chars.
 *
 * @returns {string}
 */
export function makeId() {
  return `${Date.now().toString(36)}-${rand()}`;
}
