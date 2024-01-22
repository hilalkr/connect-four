import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const storedGames = localStorage.getItem('gamesData');
    const initialGameData = storedGames ? JSON.parse(storedGames) : [];
    setGames(initialGameData);
  }, []);

  const addGame = (game) => {
    const newGame = {
      ...game,
      id: Date.now(), // Unique ID for each game
      status: 'ongoing',
      dateTime: new Date().toISOString(),
    };

    const updatedGames = [...games, newGame];
    setGames(updatedGames);
    localStorage.setItem('gamesData', JSON.stringify(updatedGames));
    return newGame.id;
  };

  const updateGameStatus = (id, status, winner = null, loser = null) => {
    const updatedGames = games.map(game => {
      if (game.id === id) {
        return { ...game, status, winner, loser, endTime: new Date().toISOString() };
      }
      return game;
    });
    setGames(updatedGames);
    localStorage.setItem('gamesData', JSON.stringify(updatedGames));
  };

  return (
    <GameContext.Provider value={{ games, addGame, updateGameStatus }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
