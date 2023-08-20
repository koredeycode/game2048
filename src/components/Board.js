import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import "./Board.css"; // You can create this CSS file for styling

const GRID_SIZE = 4;

const Board = () => {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);

  const [history, setHistory] = useState({ grid: [], score: 0 });
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const [highestTile, setHighestTile] = useState(2);

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

  useEffect(() => {
    const touchStart = { x: 0, y: 0 };
    const touchEnd = { x: 0, y: 0 };
    const minSwipeDistance = 50; // Adjust this value as needed

    const handleTouchStart = (event) => {
      touchStart.x = event.touches[0].clientX;
      touchStart.y = event.touches[0].clientY;
    };

    const handleTouchEnd = (event) => {
      touchEnd.x = event.changedTouches[0].clientX;
      touchEnd.y = event.changedTouches[0].clientY;

      const swipeDistanceX = touchEnd.x - touchStart.x;
      const swipeDistanceY = touchEnd.y - touchStart.y;

      if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
        // Horizontal swipe
        if (Math.abs(swipeDistanceX) > minSwipeDistance) {
          if (swipeDistanceX > 0) {
            // Right swipe
            handleMove("right");
          } else {
            // Left swipe
            handleMove("left");
          }
        }
      } else {
        // Vertical swipe
        if (Math.abs(swipeDistanceY) > minSwipeDistance) {
          if (swipeDistanceY > 0) {
            // Down swipe
            handleMove("down");
          } else {
            // Up swipe
            handleMove("up");
          }
        }
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  });

  useEffect(() => {
    const preventSwipeDefault = (event) => {
      event.preventDefault();
    };

    document.addEventListener("touchmove", preventSwipeDefault, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", preventSwipeDefault);
    };
  }, []);

  const handleUndo = () => {
    if (canUndo) {
      gameOver && setGameOver(false);
      isWon && setIsWon(false);
      const tempGrid = { grid, score };
      setGrid(history.grid);
      setScore(history.score);
      setHistory(tempGrid);
      setCanUndo(false);
      setCanRedo(true);
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      const tempGrid = { grid, score };
      setGrid(history.grid);
      setScore(history.score);
      setHistory(tempGrid);
      setCanUndo(true);
      setCanRedo(false);
    }
  };

  // Function to handle tile movement and mergin
  const handleMove = (direction) => {
    if (gameOver || isWon) {
      return;
    }

    const newGrid = grid.map((row) => [...row]); // Clone the grid
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
                if (newGrid[newRow - 1][col] > highestTile) {
                  setHighestTile(newGrid[newRow - 1][col]);
                }
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
                if (newGrid[newRow + 1][col] > highestTile) {
                  setHighestTile(newGrid[newRow + 1][col]);
                }
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
                if (newGrid[row][newCol - 1] > highestTile) {
                  setHighestTile(newGrid[row][newCol - 1]);
                }
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
                if (newGrid[row][newCol + 1] > highestTile) {
                  setHighestTile(newGrid[row][newCol + 1]);
                }
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
      setHistory({ grid, score });
      setGrid(newGrid);
      setScore(newScore);
      setCanUndo(true);
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
          setIsWon(true);
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

  const renderHeading = () => {
    return (
      <div>
        <h1
          style={{ margin: "5px", textAlign: "center", fontSize: "20px" }}
          className=""
        >
          2048 Game
        </h1>
        <div className="heading">
          <div className="screen">
            <span>Score: {score}</span>
            <span className="ml-3">Highest Tile: {highestTile}</span>
          </div>
          {gameOver && (
            <div
              style={{ backgroundColor: "white", color: "red" }}
              className="text-center mb-3"
            >
              Game {isWon ? "Won" : "Over"}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="content">
      {renderHeading()}

      <span style={{ textAlign: "center" }}>
        Swipe the board ←→↑↓ to combine same tiles.
      </span>
      <div className="board">
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-secondary me-2"
            onClick={handleUndo}
            disabled={!canUndo}
          >
            Undo
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleRedo}
            disabled={!canRedo}
          >
            Redo
          </button>
        </div>
        {grid.map((row, rowIndex) => (
          <div className="tile-row">
            {row.map((cell, colIndex) => (
              <div class="tile-wrapper">
                <Tile value={cell} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
