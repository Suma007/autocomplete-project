# Search with Autocomplete Component

## Description
This project features a search box that allows users to search for artists. The search includes an autocomplete component that provides suggestions based on exact matches, prefix matches, and substring matches. Upon clicking a suggestion, users can view detailed information about the selected artist from the `fixed_data.json` file.

## Technologies Used
- Python for data cleaning
- React.js for frontend development
- Node.js/Express for backend server
- CSS for styling
- Bootstrap for responsive design
- Jest for testing

## Instructions to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/Suma007/autocomplete-project
   ```

2. Navigate to the server directory, install dependencies, and start the server:
   ```bash
   cd server
   npm install
   node server.js
   ```
   The server will be accessible at http://localhost:3001.

3. Navigate to the main project directory (`src`), install dependencies, and start the React app:
   ```bash
   cd ../src
   npm install
   npm start
   ```
   Open http://localhost:3000 in your browser to view the app.

## Ranking System for Searches
- Exact matches are displayed first.
- Prefix matches are displayed second.
- Substring matches are displayed last.

## Running Tests
### Backend Server Tests
1. Navigate to the `server` directory.
2. Run the tests using:
   ```bash
   npm test
   ```

### Frontend UI Tests
1. Navigate to the `src` directory.
2. Run the tests using:
   ```bash
   npm test
   ```