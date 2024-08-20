import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BotBuilder from './components/BotBuilder';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BotBuilder />} />
            </Routes>
        </Router>
    );
}

export default App;