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

  const handleGameEnd = (winner) => {
if (winner) {
    const resultMessage = `Congratulations, ${winner === '+' ? game.playerName : 'AI'} wins!`;

    setGameResult(resultMessage);
    setShowModal(true);

   // Determination of winner and loser
    const determinedWinner = winner === '+' ? game.playerName : 'AI';
    const loser = determinedWinner === game.playerName ? 'AI' : game.playerName;
    

// Update game status
    updateGameStatus(parseInt(id), 'completed', determinedWinner, loser);
  } else {
      const resultMessage = `It's a draw!`;
      setGameResult(resultMessage);
      setShowModal(true);
    }

  };


  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div>
      <h2>Game Name: {game.name}</h2>
      <p>Current Player: {currentPlayer === '+' ? game.playerName : 'AI'}</p>

      <GameBoard
        backgroundColor={game.backgroundColor}
        onGameEnd={handleGameEnd}
        onPlayerChange={setCurrentPlayer}
        playerDiscColor={game.playerDiscColor}
      />
      <AlertModal show={showModal} onClose={handleCloseModal}>
        <p>{gameResult}</p>
      </AlertModal>
    </div>
  );
}


export default GameScreen;
