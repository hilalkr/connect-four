import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

function ListOfGamesScreen() {
  const { games } = useContext(GameContext);
  const pastGames = games.filter(game => game.status === 'completed');

  return (
    <div>
      <h2>Past Games</h2>
      {pastGames.length > 0 ? (
        <ul>
          {pastGames.map(game => (
            <li key={game.id}>
              <strong>Gamer Name:</strong> {game.name}<br />
              <strong>Date/Time:</strong> {game.dateTime}<br />
              <strong>Winner:</strong> {game.winner}<br />
              <strong>Loser:</strong> {game.loser}<br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No completed games to display.</p>
      )}
    </div>
  );
}

export default ListOfGamesScreen;
