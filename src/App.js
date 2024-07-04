import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Autocomplete from './components/AutoComplete';
import DetailPage from './components/DetailPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Autocomplete />} />
        <Route path="/detail/:name" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
