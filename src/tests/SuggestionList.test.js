import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SuggestionList from '../components/SuggestionList';
import '@testing-library/jest-dom';

describe('SuggestionList Component', () => {
  const suggestions = ['Radiohead', 'Coldplay', 'Pink Floyd'];
  const onSuggestionClick = jest.fn();

  test('renders suggestions correctly', () => {
    render(<SuggestionList suggestions={suggestions} onSuggestionClick={onSuggestionClick} />);

    suggestions.forEach((suggestion) => {
      expect(screen.getByText(suggestion)).toBeInTheDocument();
    });

    const suggestionItems = screen.getAllByRole('listitem');
    suggestionItems.forEach((item) => {
      expect(item).toHaveClass('suggestion-item');
    });
  });

  test('handles click on suggestion items', () => {
    render(<SuggestionList suggestions={suggestions} onSuggestionClick={onSuggestionClick} />);

    const suggestionItems = screen.getAllByRole('listitem');
    suggestionItems.forEach((item, index) => {
      userEvent.click(item);
      expect(onSuggestionClick).toHaveBeenLastCalledWith(suggestions[index]);
    });

    expect(onSuggestionClick).toHaveBeenCalledTimes(suggestions.length);
  });

  test('displays "No suggestions found" when suggestions array is empty', () => {
    render(<SuggestionList suggestions={[]} onSuggestionClick={onSuggestionClick} />);
    expect(screen.getByText('No suggestions found')).toBeInTheDocument();
  });

  test('propTypes are defined correctly', () => {
    const mockFunction = jest.fn();
    const mockSuggestions = ['Suggestion 1', 'Suggestion 2'];

    const { rerender } = render(<SuggestionList suggestions={mockSuggestions} onSuggestionClick={mockFunction} />);
    expect(screen.getByText(mockSuggestions[0])).toBeInTheDocument();

    const propTypesError = jest.spyOn(console, 'error');
    propTypesError.mockImplementation(() => {});

    const mockPropTypes = { suggestions: 'wrongType', onSuggestionClick: 'wrongType' };
    rerender(<SuggestionList {...mockPropTypes} />);
    expect(propTypesError).toHaveBeenCalled();

    propTypesError.mockRestore();
  });
});
