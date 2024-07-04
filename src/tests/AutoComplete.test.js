import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AutoComplete from '../components/AutoComplete';
import axios from 'axios';
import '@testing-library/jest-dom';

jest.mock('axios');

afterEach(cleanup);

describe('AutoComplete Component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks between tests
  });

  test('renders autocomplete component', () => {
    const { getByPlaceholderText } = render(
      <Router>
        <AutoComplete />
      </Router>
    );
    const inputElement = getByPlaceholderText('Search...');
    expect(inputElement).toBeInTheDocument();
  });

  test('fetches suggestions and displays them', async () => {
    axios.get.mockResolvedValueOnce({ data: ['Radiohead', 'Coldplay'] });

    const { getByPlaceholderText, getByText } = render(
      <Router>
        <AutoComplete />
      </Router>
    );
    const inputElement = getByPlaceholderText('Search...');

    fireEvent.change(inputElement, { target: { value: 'Radio' } });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/suggestions?q=Radio');
      const suggestionItem = getByText('Radiohead');
      expect(suggestionItem).toBeInTheDocument();
    });
  });


  test('handles error while fetching suggestions', async () => {
    axios.get.mockRejectedValueOnce(new Error('API request failed'));

    const { getByPlaceholderText, getByText } = render(
      <Router>
        <AutoComplete />
      </Router>
    );
    const inputElement = getByPlaceholderText('Search...');

    // Mock console.error to suppress the error message
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    fireEvent.change(inputElement, { target: { value: 'Radio' } });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      const errorElement = getByText('No suggestions found');
      expect(errorElement).toBeInTheDocument();
    });

    // Restore console.error after the test
    consoleErrorSpy.mockRestore();
  });

  test('clears timeout on unmount', async () => {
    jest.useFakeTimers();

    axios.get.mockResolvedValueOnce({ data: ['Radiohead', 'Coldplay'] });

    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout'); // Mock clearTimeout

    const { getByPlaceholderText, unmount } = render(
      <Router>
        <AutoComplete />
      </Router>
    );
    const inputElement = getByPlaceholderText('Search...');

    fireEvent.change(inputElement, { target: { value: 'Radio' } });

    unmount();
    jest.runAllTimers();


    clearTimeoutSpy.mockRestore(); // Restore clearTimeout after test
  });
});
