// GameCreationScreen.js
import React, { useState, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import '../GameCreationScreen.css';
function GameCreationScreen() {
  const [gameName, setGameName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [playerDiscColor, setPlayerDiscColor] = useState('#FF0000');
  const [aiDiscColor, setAiDiscColor] = useState('#FFFF00');
  const { addGame } = useContext(GameContext);
  const navigate = useNavigate();

  const [canAccessPastGames, setCanAccessPastGames] = useState(false);

  const handleGameNameChange = (event) => {
    setGameName(event.target.value);
  };

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
    setCanAccessPastGames(event.target.value !== '' && playerDiscColor !== '');
  };

  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handlePlayerDiscColorChange = (event) => {
    setPlayerDiscColor(event.target.value);
    setCanAccessPastGames(playerName !== '' && event.target.value !== '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!gameName || !playerName || !backgroundColor || !playerDiscColor || !aiDiscColor) {
      alert('Please fill in all fields to create a game.');
      return;
    }

    const newGameId = addGame({
      name: gameName,
      playerName,
      backgroundColor,
      playerDiscColor,
      aiDiscColor
    });

    navigate(`/game/${newGameId}`);
  };

  const goToPastGames = () => {
    if (canAccessPastGames) {
      navigate('/games');
    } else {
      alert('Please select your name and color to access past games.');
    }
  };
  

  return (
    <div className="game-creation-container">
      <h2>Create a New Game</h2>
      <form onSubmit={handleSubmit} className="game-creation-form">
        <label>
          Game Name:
          <input type="text" value={gameName} onChange={handleGameNameChange} required />
        </label>
        <br />
        <label>
          Player Name:
          <input type="text" value={playerName} onChange={handlePlayerNameChange} required />
        </label>
        <br />
        <label>
          Background Color:
          <input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} required />
        </label>
        <br />
        <label>
          Player Disc Color:
          <input type="color" value={playerDiscColor} onChange={handlePlayerDiscColorChange} required />
        </label>
        <br />
        <button type="submit">Create Game</button>
        <button type="button" onClick={goToPastGames} disabled={!canAccessPastGames}>
          Past Games
        </button>
      </form>
    </div>
  );
}

export default GameCreationScreen;
