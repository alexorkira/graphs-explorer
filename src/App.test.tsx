import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the initial page', () => {
  render(<App />);
  const div = screen.getByText("Graphs Explorer App Init");
  expect(div).toBeInTheDocument();
  expect(div.className).toEqual("App");
});
