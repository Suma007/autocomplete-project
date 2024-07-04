# Search with autocomplete component

## Description
A search box that allows users to search for artists which includes an autocomplete component that provides suggestions. Suggestions are ranked based on exact matches, prefix matches, and substring matches. Once a user clicks on any particular suggestion, user would be able to see the whole artists details we have in the fixed_data.json file.

## Technologies Used
- Python for cleaning data
- React.js
- Node.js/Express
- CSS
- Bootstrap for styling
- Jest for writing tests

## Instructions to Run Locally
1. Clone the repository.
2. Navigate to the `server` directory and run `npm install` and `node server.js`. The server would be available in port 3001.
3. Navigate to the main project directory `src` and run `npm install` and `npm start`.
4. Open `http://localhost:3000` in your browser.

## Ranking System for searches
- Exact matches are displayed first.
- Prefix matches are displayed second.
- Substring matches are displayed last.

