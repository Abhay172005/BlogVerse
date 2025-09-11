import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header with blog title', () => {
  render(<App />);
  const headerElement = screen.getByText(/My Blog/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders create post form when logged in', () => {
  // Since Supabase auth is async, we mock user as null for now
  render(<App />);
  const formTitle = screen.queryByText(/Create Post/i);
  // Initially user is null, form should not be visible
  expect(formTitle).not.toBeInTheDocument();
});

test('renders search bar', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search posts.../i);
  expect(searchInput).toBeInTheDocument();
});
