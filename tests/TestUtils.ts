import { Field } from "../src/Types/Field";
import { GameState } from "../src/Types/GameState";
import { GameStatus } from "../src/Types/GameStatus";

export function countMines(mineField: Field[][]): number {
  let numMines = 0;
  for (let i = 0; i < mineField.length; i++) {
    for (let j = 0; j < mineField[0].length; j++) {
      if (mineField[i][j].isMine) numMines++;
    }
  }
  return numMines;
}

export const testMineField = [
  [
    new Field({ x: 0, y: 0 }, false, false, 1, false),
    new Field({ x: 0, y: 1 }, false, false, 1, false),
    new Field({ x: 0, y: 2 }, false, false, 0, false),
    new Field({ x: 0, y: 3 }, false, false, 1, false),
    new Field({ x: 0, y: 4 }, false, true, 0, false),
  ],
  [
    new Field({ x: 1, y: 0 }, false, true, 0, false),
    new Field({ x: 1, y: 1 }, false, false, 2, false),
    new Field({ x: 1, y: 2 }, false, false, 0, false),
    new Field({ x: 1, y: 3 }, false, false, 1, false),
    new Field({ x: 1, y: 4 }, false, false, 1, false),
  ],
  [
    new Field({ x: 2, y: 0 }, false, false, 2, false),
    new Field({ x: 2, y: 1 }, false, true, 0, false),
    new Field({ x: 2, y: 2 }, false, false, 2, false),
    new Field({ x: 2, y: 3 }, false, false, 1, false),
    new Field({ x: 2, y: 4 }, false, false, 1, false),
  ],
  [
    new Field({ x: 3, y: 0 }, false, false, 2, false),
    new Field({ x: 3, y: 1 }, false, false, 2, false),
    new Field({ x: 3, y: 2 }, false, false, 3, false),
    new Field({ x: 3, y: 3 }, false, true, 0, false),
    new Field({ x: 3, y: 4 }, false, false, 1, false),
  ],
  [
    new Field({ x: 4, y: 0 }, false, false, 1, false),
    new Field({ x: 4, y: 1 }, false, true, 0, false),
    new Field({ x: 4, y: 2 }, false, false, 2, false),
    new Field({ x: 4, y: 3 }, false, false, 1, false),
    new Field({ x: 4, y: 4 }, false, false, 1, false),
  ],
];

export const testGameState = new GameState(
  testMineField,
  GameStatus.InProgress
);
