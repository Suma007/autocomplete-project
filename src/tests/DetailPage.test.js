import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import DetailPage from '../components/DetailPage';
import { useParams, useNavigate } from 'react-router-dom';

jest.mock('axios');

describe('DetailPage Component', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ name: 'Radiohead' });
    useNavigate.mockReturnValue(jest.fn());
  });

  test('renders loading state initially', async () => {
    render(<DetailPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {});
  });

  test('renders artist details after fetching data', async () => {
    const mockItemDetails = {
      name: 'Radiohead',
      albums: [
        {
          title: 'The King of Limbs',
          description: 'Description of The King of Limbs album',
          songs: [
            { title: 'Bloom', length: '5:15' },
            { title: 'Morning Mr Magpie', length: '4:41' },
          ],
        },
      ],
    };

    axios.get.mockResolvedValueOnce({ data: mockItemDetails });

    render(<DetailPage />);

    await waitFor(() => {
      expect(screen.getByText(`Artist Name: ${mockItemDetails.name}`)).toBeInTheDocument();
    });

    expect(screen.getByText(`Album name - ${mockItemDetails.albums[0].title}`)).toBeInTheDocument();
    expect(screen.getByText(mockItemDetails.albums[0].description)).toBeInTheDocument();

    mockItemDetails.albums[0].songs.forEach((song) => {
      expect(screen.getByText(`${song.title} - ${song.length}`)).toBeInTheDocument();
    });
  });

  test('handles back button click', async () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(<DetailPage />);

    await waitFor(() => {
      expect(screen.getByText('Back')).toBeInTheDocument();
    });

    userEvent.click(screen.getByText('Back'));

    expect(navigateMock).toHaveBeenCalledWith(-1);
  });

  test('handles error when fetching data', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch data'));

    render(<DetailPage />);

    await waitFor(() => {
      expect(screen.getByText('Error fetching data: Error: Failed to fetch data')).toBeInTheDocument();
    });
  });
});
