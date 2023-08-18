import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import "./Board.css"; // You can create this CSS file for styling

const GRID_SIZE = 4;

const Board = () => {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const newGrid = Array.from({ length: GRID_SIZE }, () =>
      Array(GRID_SIZE).fill(0)
    );

    // Generate initial tiles
    generateNewTile(newGrid);
    generateNewTile(newGrid);

    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          handleMove("up");
          break;
        case "ArrowDown":
          handleMove("down");
          break;
        case "ArrowLeft":
          handleMove("left");
          break;
        case "ArrowRight":
          handleMove("right");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
  const cloneGrid = (grid) => {
    return grid.map((row) => [...row]);
  };

  // Function to handle tile movement and mergin
  const handleMove = (direction) => {
    if (gameOver) {
      return;
    }

    const newGrid = cloneGrid(grid); // Clone the grid
    let moved = false;
    let newScore = score;

    switch (direction) {
      case "up":
        for (let col = 0; col < GRID_SIZE; col++) {
          for (let row = 1; row < GRID_SIZE; row++) {
            if (newGrid[row][col] !== 0) {
              let newRow = row;
              while (newRow > 0 && newGrid[newRow - 1][col] === 0) {
                newGrid[newRow - 1][col] = newGrid[newRow][col];
                newGrid[newRow][col] = 0;
                newRow--;
                moved = true;
              }
              if (
                newRow > 0 &&
                newGrid[newRow - 1][col] === newGrid[newRow][col]
              ) {
                newGrid[newRow - 1][col] *= 2;
                newGrid[newRow][col] = 0;
                newScore += newGrid[newRow - 1][col];
                moved = true;
              }
            }
          }
        }
        break;

      case "down":
        for (let col = 0; col < GRID_SIZE; col++) {
          for (let row = GRID_SIZE - 2; row >= 0; row--) {
            if (newGrid[row][col] !== 0) {
              let newRow = row;
              while (newRow < GRID_SIZE - 1 && newGrid[newRow + 1][col] === 0) {
                newGrid[newRow + 1][col] = newGrid[newRow][col];
                newGrid[newRow][col] = 0;
                newRow++;
                moved = true;
              }
              if (
                newRow < GRID_SIZE - 1 &&
                newGrid[newRow + 1][col] === newGrid[newRow][col]
              ) {
                newGrid[newRow + 1][col] *= 2;
                newGrid[newRow][col] = 0;
                newScore += newGrid[newRow + 1][col];
                moved = true;
              }
            }
          }
        }
        break;

      case "left":
        for (let row = 0; row < GRID_SIZE; row++) {
          for (let col = 1; col < GRID_SIZE; col++) {
            if (newGrid[row][col] !== 0) {
              let newCol = col;
              while (newCol > 0 && newGrid[row][newCol - 1] === 0) {
                newGrid[row][newCol - 1] = newGrid[row][newCol];
                newGrid[row][newCol] = 0;
                newCol--;
                moved = true;
              }
              if (
                newCol > 0 &&
                newGrid[row][newCol - 1] === newGrid[row][newCol]
              ) {
                newGrid[row][newCol - 1] *= 2;
                newGrid[row][newCol] = 0;
                newScore += newGrid[row][newCol - 1];
                moved = true;
              }
            }
          }
        }
        break;

      case "right":
        for (let row = 0; row < GRID_SIZE; row++) {
          for (let col = GRID_SIZE - 2; col >= 0; col--) {
            if (newGrid[row][col] !== 0) {
              let newCol = col;
              while (newCol < GRID_SIZE - 1 && newGrid[row][newCol + 1] === 0) {
                newGrid[row][newCol + 1] = newGrid[row][newCol];
                newGrid[row][newCol] = 0;
                newCol++;
                moved = true;
              }
              if (
                newCol < GRID_SIZE - 1 &&
                newGrid[row][newCol + 1] === newGrid[row][newCol]
              ) {
                newGrid[row][newCol + 1] *= 2;
                newGrid[row][newCol] = 0;
                newScore += newGrid[row][newCol + 1];
                moved = true;
              }
            }
          }
        }
        break;

      default:
        break;
    }

    if (moved) {
      generateNewTile(newGrid);
      checkWinLoss(newGrid);
      setGrid(newGrid);
      setScore(newScore);
    }
  };

  const generateNewTile = (grid) => {
    const emptyCells = [];

    // Find all empty cells
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length === 0) {
      return; // No empty cells, no need to generate a new tile
    }

    // Randomly select an empty cell and set its value to 2 or 4
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
  };

  const checkWinLoss = (grid) => {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === 2048) {
          setGameOver(true); // You've won!
          return;
        }
      }
    }

    // Check for valid moves (empty cells or adjacent cells with the same value)
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const tileValue = grid[row][col];

        if (tileValue === 0) {
          return; // There's an empty cell, the game can continue
        }

        // Check adjacent cells
        if (
          (row > 0 && grid[row - 1][col] === tileValue) ||
          (row < grid.length - 1 && grid[row + 1][col] === tileValue) ||
          (col > 0 && grid[row][col - 1] === tileValue) ||
          (col < grid[row].length - 1 && grid[row][col + 1] === tileValue)
        ) {
          return; // There's a valid move, the game can continue
        }
      }
    }

    setGameOver(true); // No valid moves, you've lost
  };

  // Function to render the game grid
  const renderGrid = () => {
    return (
      <div className="container">
        <h1 className="text-center mt-4 mb-3">2048 Game</h1>
        <div className="score-n-highest">
          <span className="score mb-1">Score: {score}</span>
          <span className="highest-tile mb-1">Highest Tile: {0}</span>
        </div>
        {gameOver && <div className="game-over">Game Over</div>}
        <div className="game-board">
          {grid.map((row, rowIndex) => (
            <>
              {row.map((cell, colIndex) => (
                <Tile key={colIndex} value={cell} />
              ))}
            </>
          ))}
        </div>
      </div>
    );
  };

  return <div className="board">{renderGrid()}</div>;
};

export default Board;
