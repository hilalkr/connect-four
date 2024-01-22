import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GameProvider } from './context/GameContext'; // Import the GameProvider
import GameCreationScreen from './components/GameCreationScreen';
import ListOfGamesScreen from './components/ListOfGamesScreen';
import GameScreen from './components/GameScreen';

function App() {
  return (
    <GameProvider> {/* Wrap your entire application with GameProvider */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<GameCreationScreen />} />
            <Route path="/games" element={<ListOfGamesScreen />} />
            <Route path="/game/:id" element={<GameScreen />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
