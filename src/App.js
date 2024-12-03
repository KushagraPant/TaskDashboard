import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Filter from './pages/Filter';



const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Dashboard />} />
            <Route path="/tasks/filter" element={<Filter />} />
            <Route path="/tasks/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
);

export default App;
