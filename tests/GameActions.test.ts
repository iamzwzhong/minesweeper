import {
  createNewGame,
  flagSquare,
  getSquaresToOpen,
} from "../src/Pages/Game/GameActions";
import { Field } from "../src/Types/Field";
import { GameStatus } from "../src/Types/GameStatus";
import { countMines, testGameState } from "./TestUtils";

test("creating new game", () => {
  const gameState = createNewGame(9, 9, 10);
  expect(gameState.status).toBe(GameStatus.InProgress);
  const mineField = gameState.mineField;
  expect(mineField.length).toBe(9);
  expect(mineField[0].length).toBe(9);
  expect(countMines(mineField)).toBe(10);
});

test("flag square", () => {
  const updatedGameState = flagSquare(
    testGameState,
    new Field({ x: 0, y: 0 }, false, false, 1, false)
  );
  expect(updatedGameState.mineField[0][0].isFlagged).toBe(true);
});

test("unflag square", () => {
  let updatedGameState = flagSquare(
    testGameState,
    testGameState.mineField[0][0]
  );
  expect(updatedGameState.mineField[0][0].isFlagged).toBe(false);
});

test("get squares to open", () => {
  let squaresToOpen = getSquaresToOpen(
    testGameState,
    testGameState.mineField[0][0]
  );
  expect(squaresToOpen).toStrictEqual([
    testGameState.mineField[1][0],
    testGameState.mineField[0][1],
    testGameState.mineField[1][1],
  ]);
});
