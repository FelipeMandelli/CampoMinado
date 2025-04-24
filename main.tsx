import { useState } from "react";

type Cell = {
  isMine: boolean;
  revealed: boolean;
  adjacentMines: number;
  flagged: boolean;
};

const GRID_SIZE = 10;
const MINES_COUNT = 15;

function generateGrid(excludeX?: number, excludeY?: number): Cell[][] {
  const grid: Cell[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => ({
      isMine: false,
      revealed: false,
      adjacentMines: 0,
      flagged: false,
    }))
  );

  let minesPlaced = 0;
  while (minesPlaced < MINES_COUNT) {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);

    if (
      !grid[x][y].isMine &&
      (excludeX === undefined ||
        (Math.abs(x - excludeX) > 1 || Math.abs(y - excludeY) > 1))
    ) {
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
  const [grid, setGrid] = useState<Cell[][]>(generateGrid);
  const [gameOver, setGameOver] = useState(false);
  const [firstClick, setFirstClick] = useState(true);

  function revealCell(x: number, y: number) {
    if (gameOver || grid[x][y].revealed || grid[x][y].flagged) return;

    let newGrid = grid;

    if (firstClick) {
      newGrid = generateGrid(x, y);
      setFirstClick(false);
    }

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
        newGrid[cx][cy].revealed ||
        newGrid[cx][cy].flagged
      )
        return;

      newGrid[cx][cy].revealed = true;

      if (newGrid[cx][cy].adjacentMines === 0) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx !== 0 || dy !== 0) {
              reveal(cx + dx, cy + dy);
            }
          }
        }
      }
    };

    reveal(x, y);
    setGrid([...newGrid]);
  }

  function toggleFlag(x: number, y: number, event: React.MouseEvent) {
    event.preventDefault();
    if (grid[x][y].revealed) return;
    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    newGrid[x][y].flagged = !newGrid[x][y].flagged;
    setGrid(newGrid);
  }

  function revealAdjacent(x: number, y: number) {
    if (!grid[x][y].revealed) return;
    let flagCount = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          nx < GRID_SIZE &&
          ny >= 0 &&
          ny < GRID_SIZE &&
          grid[nx][ny].flagged
        ) {
          flagCount++;
        }
      }
    }
    if (flagCount === grid[x][y].adjacentMines) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = x + dx;
          const ny = y + dy;
          if (
            nx >= 0 &&
            nx < GRID_SIZE &&
            ny >= 0 &&
            ny < GRID_SIZE &&
            !grid[nx][ny].flagged
          ) {
            revealCell(nx, ny);
          }
        }
      }
    }
  }

  function resetGame() {
    setGrid(generateGrid());
    setGameOver(false);
    setFirstClick(true);
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold">Campo Minado</h1>
      <button onClick={resetGame} className="mt-2 p-2 bg-blue-500 text-white rounded">
        Resetar Jogo
      </button>
      <div className="grid grid-cols-10 gap-1 mt-4 border p-2">
        {grid.map((row, x) =>
          row.map((cell, y) => (
            <button
              key={`${x}-${y}`}
              className={`w-10 h-10 flex items-center justify-center border text-lg font-bold ${
                cell.revealed ? (cell.isMine ? "bg-red-500 text-white" : "bg-gray-300") : "bg-gray-500"
              }`}
              onClick={() => revealCell(x, y)}
              onContextMenu={(e) => toggleFlag(x, y, e)}
              onDoubleClick={() => revealAdjacent(x, y)}
            >
              {cell.flagged ? "🚩" : cell.revealed && !cell.isMine ? cell.adjacentMines || "" : ""}
            </button>
          ))
        )}
      </div>
      {gameOver && <p className="mt-4 text-red-600">Game Over! Pressione reset para recomeçar.</p>}
    </div>
  );
}
