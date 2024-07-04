import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import DetailPage from '../components/DetailPage';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('axios');

const mockUseParams = jest.fn();
const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockUseParams(),
  useNavigate: () => mockUseNavigate,
}));

describe('DetailPage Component', () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ name: 'Radiohead' });
  });

  test('renders loading state initially', async () => {
    render(
      <Router>
        <DetailPage />
      </Router>
    );
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

    render(
      <Router>
        <DetailPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(`Artist Name: ${mockItemDetails.name}`)).toBeInTheDocument();
    });

    expect(screen.getByText(`Album name - ${mockItemDetails.albums[0].title}`)).toBeInTheDocument();
    expect(screen.getByText(mockItemDetails.albums[0].description)).toBeInTheDocument();

    mockItemDetails.albums[0].songs.forEach((song) => {
      expect(screen.getByText(`${song.title} - ${song.length}`)).toBeInTheDocument();
    });
  });

  test('handles error when fetching data', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch data'));

    render(
      <Router>
        <DetailPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Error fetching data: Failed to fetch data')).toBeInTheDocument();
    });
  });
});
