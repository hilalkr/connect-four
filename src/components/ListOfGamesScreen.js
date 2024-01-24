import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import '../ListOfGamesScreen.css'; 

function ListOfGamesScreen() {
  const { games } = useContext(GameContext);
  const pastGames = games.filter(game => game.status === 'completed');

  return (
    <div className="past-games-container">
      <h2 className="past-games-header">Past Games</h2>
      {pastGames.length > 0 ? (
        <div className="game-list">
          {pastGames.map(game => (
            <div className="game-card" key={game.id} style={{backgroundColor: game.backgroundColor}}>
              <h3>{game.name}</h3>
              <p><strong>Date/Time:</strong> {game.dateTime}</p>
              <p><strong>Winner:</strong> {game.winner}</p>
              <p><strong>Loser:</strong> {game.loser}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-games-message">No completed games to display.</p>
      )}
    </div>
  );
}

export default ListOfGamesScreen;
