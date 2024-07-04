import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuggestionList from './SuggestionList';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

const AutoComplete = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuggestions = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:3001/suggestions?q=${query}`);
                setSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        };

        // Debounce function to delay API calls
        const delayDebounceFn = setTimeout(() => {
            if (query.length > 0) {
                fetchSuggestions();
            } else {
                setSuggestions([]);
            }
        }, 300); // Adjust debounce delay as needed (e.g., 300ms)

        // Cleanup function to clear timeout
        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleSuggestionClick = (queryResult) => {
        navigate(`/detail/${queryResult}`);
    };

    return (
        <div className="container autocomplete-container">
            <h1><p>Search details of your favorite artists</p></h1>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search..."
                className="autocomplete-input"
            />
            {isLoading && <div>Loading...</div>}
            {!isLoading && query.length > 0 && (
                <SuggestionList suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />
            )}
        </div>
    );
};

export default AutoComplete;
