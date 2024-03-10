import { render, screen } from '@testing-library/react';
import App from './App';
jest.mock('./App.css', () => require('../__mocks__/styles.css'));

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});
