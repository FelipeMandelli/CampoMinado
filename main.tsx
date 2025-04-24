import { useState } from "react";

type Cell = {
  isMine: boolean;
  revealed: boolean;
  adjacentMines: number;
};

const GRID_SIZE = 10;
const MINES_COUNT = 15;

function generateGrid(): Cell[][] {
  const grid: Cell[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => ({
      isMine: false,
      revealed: false,
      adjacentMines: 0,
    }))
  );

  let minesPlaced = 0;
  while (minesPlaced < MINES_COUNT) {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    if (!grid[x][y].isMine) {
      grid[x][y].isMine = true;
      minesPlaced++;
    }
  }

  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      if (!grid[x][y].isMine) {
        let adjacentMines = 0;
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const nx = x + dx;
            const ny = y + dy;
            if (
              nx >= 0 &&
              nx < GRID_SIZE &&
              ny >= 0 &&
              ny < GRID_SIZE &&
              grid[nx][ny].isMine
            ) {
              adjacentMines++;
            }
          }
        }
        grid[x][y].adjacentMines = adjacentMines;
      }
    }
  }
  return grid;
}

export default function Minesweeper() {
  const [grid, setGrid] = useState<Cell[][]>(generateGrid());
  const [gameOver, setGameOver] = useState(false);

  function revealCell(x: number, y: number) {
    if (gameOver || grid[x][y].revealed) return;
    
    const newGrid = [...grid];
    
    if (newGrid[x][y].isMine) {
      setGameOver(true);
      alert("Game Over! Você atingiu uma mina.");
      return;
    }

    const reveal = (cx: number, cy: number) => {
      if (
        cx < 0 ||
        cx >= GRID_SIZE ||
        cy < 0 ||
        cy >= GRID_SIZE ||
        newGrid[cx][cy].revealed
      ) return;

      newGrid[cx][cy].revealed = true;

      if (newGrid[cx][cy].adjacentMines === 0) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            reveal(cx + dx, cy + dy);
          }
        }
      }
    };

    reveal(x, y);
    setGrid(newGrid);
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold">Campo Minado</h1>
      <div className="grid grid-cols-10 gap-1 mt-4 border p-2">
        {grid.map((row, x) =>
          row.map((cell, y) => (
            <button
              key={`${x}-${y}`}
              className={`w-10 h-10 flex items-center justify-center border text-lg font-bold ${
                cell.revealed ? "bg-gray-300" : "bg-gray-500"
              }`}
              onClick={() => revealCell(x, y)}
            >
              {cell.revealed && !cell.isMine ? cell.adjacentMines || "" : ""}
            </button>
          ))
        )}
      </div>
      {gameOver && <p className="mt-4 text-red-600">Game Over! Recarregue a página para recomeçar.</p>}
    </div>
  );
}