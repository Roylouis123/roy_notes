import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import logo from '../logo.svg';

describe('App component', () => {
  // Check if the logo is rendered
  it('renders logo', () => {
    render(<App />);
    const logoElement = screen.getByAltText(/logo/i);
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', logo);
  });

  // Check if the "Learn React" link is rendered
  it('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://reactjs.org');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  // Check if the h1 with text "Welcome to React" is rendered
  it('renders h1 with text "Welcome to React"', () => {
    render(<App />);
    const h1Element = screen.getByRole('heading', { level: 1 });
    expect(h1Element).toHaveTextContent('Welcome to React');
  });

  // Check if the paragraph with text "To get started, edit src/App.js and save to reload." is rendered
  it('renders paragraph with text "To get started, edit src/App.js and save to reload."', () => {
    render(<App />);
    const pElement = screen.getByText(/To get started, edit src\/App\.js and save to reload\./i);
    expect(pElement).toBeInTheDocument();
  });

  // Check if the link with text "Learn React" is rendered
  it('renders a link with text "Learn React"', () => {
    render(<App />);
    const linkElement = screen.getByText(/Learn React/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://reactjs.org');
  });

});
