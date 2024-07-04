import React from 'react';
import PropTypes from 'prop-types';
import '../styles/main.css';

const SuggestionList = ({ suggestions, onSuggestionClick }) => {
    return (
        <div>
            <ul className="suggestion-list">
                {suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                        <li 
                            key={index} 
                            onClick={() => onSuggestionClick(suggestion)} 
                            className="suggestion-item"
                        >
                            {suggestion}
                        </li>
                    ))
                ) : (
                    <li className="no-suggestions">No suggestions found</li> 
                )}
            </ul>
        </div>
    );
};

SuggestionList.propTypes = {
    suggestions: PropTypes.array.isRequired,
    onSuggestionClick: PropTypes.func.isRequired,
};

export default SuggestionList;
