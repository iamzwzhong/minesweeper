import { Field } from "../../Types/Field";
import { GameState } from "../../Types/GameState";
import { GameStatus } from "../../Types/GameStatus";
import { Point } from "../../Types/Point";

const dx = [1, -1, 0, 0, 1, -1, 1, -1];
const dy = [0, 0, 1, -1, 1, -1, -1, 1];

function setMinesCount(mineField: Field[][]) {
  const numRows = mineField.length;
  const numCols = mineField[0].length;
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      let numMines = 0;
      for (let d = 0; d < 8; d++) {
        const nextX = r + dx[d];
        const nextY = c + dy[d];
        if (0 <= nextX && nextX < numRows && 0 <= nextY && nextY < numCols) {
          if (mineField[nextX][nextY].isMine) {
            numMines++;
          }
        }
      }
      mineField[r][c].numMines = numMines;
    }
  }
}

export function createNewGame(
  rows: number,
  columns: number,
  numMines: number
): GameState {
  let mineField = Array(rows)
    .fill(null)
    .map((_, i: number) => {
      return Array(columns)
        .fill(null)
        .map((_, j: number) => {
          return new Field({ x: i, y: j }, false, false, 0, false);
        });
    });
  let totalMinesPlaced = 0;
  while (totalMinesPlaced < numMines) {
    const randX = Math.floor(Math.random() * rows);
    const randY = Math.floor(Math.random() * columns);
    const foundField = mineField[randX][randY];
    if (!foundField.isMine) {
      mineField[randX][randY].isMine = true;
      totalMinesPlaced++;
    }
  }
  setMinesCount(mineField);
  return new GameState(mineField, GameStatus.InProgress);
}

function revealMines(gameState: GameState, square: Field): GameState {
  return new GameState(
    gameState.mineField.map((row) => {
      return row.map((field) => {
        if (field.isMine) {
          return new Field(
            field.position,
            true,
            field.isMine,
            square.position === field.position ? -1 : field.numMines,
            field.isFlagged
          );
        } else {
          return new Field(
            field.position,
            field.isOpened,
            field.isMine,
            field.numMines,
            field.isFlagged
          );
        }
      });
    }),
    GameStatus.Fail
  );
}

function exploreZeroes(
  gameState: GameState,
  square: Field,
  visited: Set<Point>
): void {
  const currPos = square.position;
  if (visited.has(currPos)) return;
  else {
    visited.add(currPos);
    if (!square.isMine) {
      gameState.mineField[currPos.x][currPos.y].isOpened = true;
      if (square.numMines === 0) {
        const numRows = gameState.mineField.length;
        const numCols = gameState.mineField[0].length;
        for (let d = 0; d < 8; d++) {
          const nextX = currPos.x + dx[d];
          const nextY = currPos.y + dy[d];
          if (0 <= nextX && nextX < numRows && 0 <= nextY && nextY < numCols) {
            exploreZeroes(
              gameState,
              gameState.mineField[nextX][nextY],
              visited
            );
          }
        }
      }
    }
  }
}

function isCompletedGame(gameState: GameState): GameStatus {
  const rows = gameState.mineField.length;
  const columns = gameState.mineField[0].length;
  let squaresOpened = 0;
  let numMines = 0;
  gameState.mineField.forEach((row) => {
    row.forEach((field) => {
      if (field.isMine) numMines += 1;
      else if (field.isOpened) squaresOpened += 1;
    });
  });
  if (rows * columns - squaresOpened === numMines) return GameStatus.Success;
  else return GameStatus.InProgress;
}

export function getSquaresToOpen(gameState: GameState, square: Field): Field[] {
  const currPos = square.position;
  const rows = gameState.mineField.length;
  const columns = gameState.mineField[0].length;
  let squaresToOpen: Field[] = [];
  for (let d = 0; d < 8; d++) {
    const nextX = currPos.x + dx[d];
    const nextY = currPos.y + dy[d];
    if (0 <= nextX && nextX < rows && 0 <= nextY && nextY < columns) {
      const currField = gameState.mineField[nextX][nextY];
      if (!currField.isOpened && !currField.isFlagged) {
        squaresToOpen.push(currField);
      }
    }
  }
  return squaresToOpen;
}

export function openSquare(gameState: GameState, square: Field): GameState {
  if (square.isFlagged) return gameState;
  else if (square.isMine) return revealMines(gameState, square);
  else {
    exploreZeroes(gameState, square, new Set());
    return new GameState(
      gameState.mineField,
      gameState.status === GameStatus.Fail
        ? GameStatus.Fail
        : isCompletedGame(gameState)
    );
  }
}

export function flagSquare(gameState: GameState, square: Field): GameState {
  const pos = square.position;
  gameState.mineField[pos.x][pos.y].isFlagged =
    !gameState.mineField[pos.x][pos.y].isFlagged;
  return new GameState(gameState.mineField, gameState.status);
}
