import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title and input', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /todo/i });
  expect(heading).toBeInTheDocument();

  const input = screen.getByPlaceholderText(/what needs to be done/i);
  expect(input).toBeInTheDocument();
});

test('renders filter buttons', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /active/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument();
});
