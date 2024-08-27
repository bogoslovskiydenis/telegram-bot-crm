import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BotBuilder from './components/BotBuilder';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Router>
                <Routes>
                    <Route path="/" element={<BotBuilder />} />
                </Routes>
            </Router>
        </DndProvider>
    );
}

export default App;
