import React, { createContext, useState, useEffect } from 'react';


export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [nextId, setNextId] = useState(1);

  // Initialize game data from local storage or provide default data
  useEffect(() => {
    const initialGameData = JSON.parse(localStorage.getItem('gamesData')) || [
      //  hardcoded games here...
    ];
    setGames(initialGameData);
    setNextId(initialGameData.length ? Math.max(...initialGameData.map(g => g.id)) + 1 : 1);
  }, []);
  
  
  

  const addGame = (game) => {
    // Assuming 'game' includes basic details like game name, possibly players, etc.
    
    const newGame = {
        ...game,
        id: nextId,
        status: 'ongoing',
        dateTime: new Date().toISOString(), // Capture the current date and time
        winner: null, // Initially, there's no winner
        loser: null // Initially, there's no loser
    };

    setGames((prevGames) => [...prevGames, newGame]);
    setNextId(nextId + 1);

    // Store the updated games data in local storage
    localStorage.setItem('gamesData', JSON.stringify([...games, newGame]));

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
    localStorage.setItem('gamesData', JSON.stringify(updatedGames)); // Store updated data
  };

  return (
    <GameContext.Provider value={{ games, addGame, updateGameStatus }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
