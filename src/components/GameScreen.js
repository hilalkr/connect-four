import React, { useContext, useState } from 'react';
import { GameContext } from '../context/GameContext';
import { useParams } from 'react-router-dom';
import GameBoard from './GameBoard';
import AlertModal from './AlertModal';

function GameScreen() {
  const { games, updateGameStatus } = useContext(GameContext);
  const { id } = useParams();
  const game = games.find(g => g.id === parseInt(id));
  const [gameResult, setGameResult] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('+');
  const [playerDiscColor, setPlayerDiscColor] = useState('+');

  const [showModal, setShowModal] = useState(false);

  const handleGameEnd = (winnerName) => {
    const resultMessage = `${game.name} wins!`;
    setGameResult(resultMessage);
    setShowModal(true);

    const loser = winnerName === game.playerName ? 'AI' : game.playerName;
    updateGameStatus(parseInt(id), 'completed', game.name, loser);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Additional logic to reset the game or navigate away if needed
  };

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div>
      <h2>Playing: {game.name}</h2>
      <p>Current Player: {currentPlayer}</p> {/* Display currentPlayer */}

      <GameBoard
        backgroundColor={game.backgroundColor}
        onGameEnd={handleGameEnd}
        onPlayerChange={setCurrentPlayer}
        playerDiscColor= {game.playerDiscColor}
      />
      <AlertModal show={showModal} onClose={handleCloseModal}>
        <p>{gameResult}</p>
      </AlertModal>
    </div>
  );
}


export default GameScreen;
