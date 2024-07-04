const express = require('express');
const cors = require('cors');
const data = require('./fixed_data.json');
const app = express();

app.use(cors());

// Function to rank suggestions
const rankSuggestions = (query, suggestions) => {
    const lowerCaseQuery = query.toLowerCase();
    const exactMatches = [];
    const prefixMatches = [];
    const substringMatches = [];

    suggestions.forEach(suggestion => {
        const lowerCaseSuggestion = suggestion.toLowerCase();
        if (lowerCaseSuggestion === lowerCaseQuery) {
            exactMatches.push(suggestion);
        } else if (lowerCaseSuggestion.startsWith(lowerCaseQuery)) {
            prefixMatches.push(suggestion);
        } else if (lowerCaseSuggestion.includes(lowerCaseQuery)) {
            substringMatches.push(suggestion);
        }
    });

    return [...exactMatches, ...prefixMatches, ...substringMatches];
};

// Endpoint to fetch suggestions
app.get('/suggestions', (req, res) => {
    if (!req.query.q) {
        return res.status(400).json({ error: 'No query parameter provided' });
    }
    const query = req.query.q.toLowerCase();
    const results = [];

    data.forEach(artist => {
        if (artist.name.toLowerCase().includes(query)) {
            results.push(artist.name);
        }
        artist.albums.forEach(album => {
            if (album.title.toLowerCase().includes(query)) {
                results.push(`${artist.name} - ${album.title}`);
            }
            album.songs.forEach(song => {
                if (song.title.toLowerCase().includes(query)) {
                    results.push(`${artist.name} - ${album.title} - ${song.title}`);
                }
            });
        });
    });

    const rankedResults = rankSuggestions(query, results);
    res.json(rankedResults);
});

//Endpoint to fetch a specific artist
app.get('/fetchData', (req, res) => {
    const artistDetails = req.query.q.toLowerCase();
    let results;

    if (artistDetails.includes('-')) {
        const [artistName, albumTitle, songTitle] = artistDetails.split('-').map(item => item.trim());
        results = data.filter(artist => artist.name.toLowerCase().includes(artistName));
    } else {
        results = data.filter(artist => artist.name.toLowerCase().includes(artistDetails));
    }

    if(results.length > 0){
        results = results[0];
    } else {
        results = {}
    }

    res.json(results);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
