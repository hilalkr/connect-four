// GameBoard.js
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { GameContext } from '../context/GameContext';


function GameBoard({ backgroundColor, onGameEnd, onPlayerChange,playerDiscColor, aiDiscColor}) {
  const { addGame } = useContext(GameContext);
    const rows = 6;
    const columns = 7;
    const [board, setBoard] = useState(Array(rows).fill().map(() => Array(columns).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState('+');
    const [gameOver, setGameOver] = useState(false); // Declare gameOver state
    const [winner, setWinner] = useState(null);      // Declare winner state


  const resetGame = () => {
    setBoard(Array(rows).fill().map(() => Array(columns).fill(null)));
    setCurrentPlayer('+');
    setGameOver(false);
    setWinner(null); // Reset winner state
  };

  const checkLine = (a, b, c, d) => {
    // Check if the four cells have the same non-null value
    return (a !== null) && (a === b) && (a === c) && (a === d);
  }
  
  const checkForWinner = (newBoard) => {
    // Horizontal Check
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns - 3; col++) {
        if (checkLine(newBoard[row][col], newBoard[row][col+1], newBoard[row][col+2], newBoard[row][col+3])) {
          return newBoard[row][col];
        }
      }
    }

    // Vertical Check
    for (let row = 0; row < rows - 3; row++) {
      for (let col = 0; col < columns; col++) {
        if (checkLine(newBoard[row][col], newBoard[row+1][col], newBoard[row+2][col], newBoard[row+3][col])) {
          return newBoard[row][col];
        }
      }
    }

    // Diagonal (positive slope) Check
    for (let row = 3; row < rows; row++) {
      for (let col = 0; col < columns - 3; col++) {
        if (checkLine(newBoard[row][col], newBoard[row-1][col+1], newBoard[row-2][col+2], newBoard[row-3][col+3])) {
          return newBoard[row][col];
        }
      }
    }

    // Diagonal (negative slope) Check
    for (let row = 3; row < rows; row++) {
      for (let col = 3; col < columns; col++) {
        if (checkLine(newBoard[row][col], newBoard[row-1][col-1], newBoard[row-2][col-2], newBoard[row-3][col-3])) {
          return newBoard[row][col];
        }
      }
    }

    // No winner
    return null;
  };

  const isBoardFull = (board) => {
    return board.every(row => row.every(cell => cell !== null));
  };

const gameStateToString = (board) => {
  // Initialize an empty string to represent the board
  let boardString = '';

  // Loop through each row and column of the board
  for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
          // Append the cell value to the string (e.g., 'X', 'O', or '-')
          boardString += board[row][col] ? board[row][col] : '-';
      }
      // Add a newline character after each row (if needed)
      boardString += '\n';
  }

  return boardString;
};
  const placeDisc = useCallback((columnIndex) => {
    if (gameOver) return; // Prevent further moves if the game is over

    for (let row = rows - 1; row >= 0; row--) {
      if (board[row][columnIndex] === null) {
        const newBoard = board.map(row => [...row]);
        newBoard[row][columnIndex] = currentPlayer;
        setBoard(newBoard);

        const winner = checkForWinner(newBoard);
        if (winner) {
          onGameEnd(`${winner} wins!`);
          setGameOver(true); // Set game as over
          return;
        } else if (isBoardFull(newBoard)) {
          onGameEnd("It's a draw!");
          setGameOver(true); // Set game as over in case of a draw
        } else {
          const nextPlayer = currentPlayer === '+' ? 'O' : '+';
          setCurrentPlayer(nextPlayer); // Burada setCurrentPlayer fonksiyonunu çağırıyoruz
          onPlayerChange(nextPlayer); // Burada onPlayerChange prop'unu çağırıyoruz
        }
        break;
      }
    }
  }, [board, currentPlayer, onGameEnd, gameOver, checkForWinner, onPlayerChange]);

  
  const getAiMove = async (gameState) => {
    try {
      console.log('Requesting AI move with gameState:', gameState);

      const response = await fetch('http://localhost:5000/api/get-ai-move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameState }),
      }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('AI response:', data);

      return data; // Assuming the server returns the columnIndex for the AI's move
    } catch (error) {
      console.error('Error fetching AI move:', error);
    }
  };

  useEffect(() => {
    let timeoutId;
    if (gameOver) {
      if (!winner) {
        timeoutId = setTimeout(resetGame, 3000); // Auto-restart the game if it's a draw
      }
    }
    return () => clearTimeout(timeoutId);
  }, [gameOver, winner, resetGame]);
  
  // useEffect(() => {
  //   if (currentPlayer === 'O' && !gameOver) {
  //     // Convert the current board state to string format
  //     const gameState = gameStateToString(board);
  //     // Request the AI's move from the server
  //     console.log(gameState);
  //     getAiMove(gameState).then(columnIndex => {
  //       console.log("columnindex:", columnIndex);
  //       if (columnIndex !== undefined) {
  //         // Extract the AI's move from the response
    
  //         // Log the AI's move
  //         console.log('AI Move:', columnIndex);
    
  //         // Place the AI's move on the game board
  //         placeDisc(columnIndex, 'O');
  //       }
  //     });
  //   }
  // }, [currentPlayer, placeDisc, board, gameOver, winner]);
  useEffect(() => {
    if (currentPlayer === 'O' && !gameOver && !winner) {
      const gameState = gameStateToString(board);
      console.log(gameState);
      getAiMove(gameState).then(columnIndex => {
        console.log("columnindex:", columnIndex);
        if (columnIndex !== undefined) {
          console.log('AI Move:', columnIndex);
          placeDisc(columnIndex, 'O');
        }
      });
    }
  }, [currentPlayer, placeDisc, board, gameOver, winner]);
  
  return (
    <div style={{ backgroundColor: backgroundColor, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, columnIndex) => (
            <div key={columnIndex} onClick={() => currentPlayer === '+' && placeDisc(columnIndex)} style={{
              width: 50,
              height: 50,
              backgroundColor: cell ? (cell === '+' ? playerDiscColor : 'yellow') : 'white',
              border: '1px solid black',
              boxSizing: 'border-box'
            }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
