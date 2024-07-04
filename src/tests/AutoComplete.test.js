import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import axios from 'axios';
import AutoComplete from '../components/AutoComplete';

jest.mock('axios');

afterEach(cleanup);

describe('AutoComplete Component', () => {
  test('renders autocomplete component', () => {
    const { getByPlaceholderText } = render(<AutoComplete />);
    const inputElement = getByPlaceholderText('Search...');
    expect(inputElement).toBeInTheDocument();
  });

  test('fetches suggestions and displays them', async () => {
    axios.get.mockResolvedValueOnce({ data: ['Radiohead', 'Coldplay'] });

    const { getByPlaceholderText, getByText } = render(<AutoComplete />);
    const inputElement = getByPlaceholderText('Search...');

    fireEvent.change(inputElement, { target: { value: 'Radio' } });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/suggestions?q=Radio');
      const suggestionItem = getByText('Radiohead');
      expect(suggestionItem).toBeInTheDocument();
    });
  });

  test('displays loading indicator while fetching suggestions', async () => {
    axios.get.mockResolvedValueOnce({ data: ['Radiohead', 'Coldplay'] });

    const { getByPlaceholderText, getByText } = render(<AutoComplete />);
    const inputElement = getByPlaceholderText('Search...');

    fireEvent.change(inputElement, { target: { value: 'Radio' } });

    const loadingElement = getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  test('handles error while fetching suggestions', async () => {
    axios.get.mockRejectedValueOnce(new Error('API request failed'));

    const { getByPlaceholderText, getByText } = render(<AutoComplete />);
    const inputElement = getByPlaceholderText('Search...');

    fireEvent.change(inputElement, { target: { value: 'Radio' } });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      const errorElement = getByText('Error fetching suggestions:');
      expect(errorElement).toBeInTheDocument();
    });
  });

  test('clears timeout on unmount', async () => {
    axios.get.mockResolvedValueOnce({ data: ['Radiohead', 'Coldplay'] });

    const { getByPlaceholderText, unmount } = render(<AutoComplete />);
    const inputElement = getByPlaceholderText('Search...');

    fireEvent.change(inputElement, { target: { value: 'Radio' } });

    unmount();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });
});
