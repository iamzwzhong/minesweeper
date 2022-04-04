import { useState } from "react";
import { MineField } from "../../Components/MineField";
import {
  createNewGame,
  flagSquare,
  getSquaresToOpen,
  openSquare,
} from "./GameActions";
import clockIcon from "../../Assets/Icons/clock.png";
import flagIcon from "../../Assets/Icons/flag.png";
import { Field } from "../../Types/Field";
import { GameState } from "../../Types/GameState";

export const Game = (props: GameProps) => {
  const [rows, setRows] = useState(props.rows);
  const [columns, setColumns] = useState(props.columns);
  const [gameState, setGameState] = useState(
    createNewGame(rows, columns, props.numBombs)
  );
  const [started, setStarted] = useState(false);
  const [flags, setFlags] = useState(props.numBombs);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timer, setTimer] = useState(setInterval(() => {}));

  function startTimer() {
    setTimer(
      setInterval(() => {
        setElapsedSeconds((elapsedSeconds) => elapsedSeconds + 1);
      }, 1000)
    );
  }

  function countFlaggedSquares(gameState: GameState) {
    const add = (a: number, b: number) => a + b;
    return (
      props.numBombs -
      gameState.mineField
        .map((row) => {
          return row
            .map((field) => {
              return field.isFlagged ? 1 : 0;
            })
            .reduce(add, 0);
        })
        .reduce(add, 0)
    );
  }

  function onLeftClick(mineSquare: Field) {
    if (!started) {
      setStarted(true);
      startTimer();
    }
    const updatedGameState = openSquare(gameState, mineSquare);
    if (updatedGameState.completed) endGame();
    setGameState(updatedGameState);
  }

  function onDoubleClick(mineSquare: Field) {
    const squaresToOpen: Field[] = getSquaresToOpen(gameState, mineSquare);
    let currGameState = gameState;
    for (let i = 0; i < squaresToOpen.length; i++) {
      currGameState = openSquare(currGameState, squaresToOpen[i]);
    }
    setGameState(currGameState);
  }

  function onRightClick(mineSquare: Field) {
    if ((flags === 0 && mineSquare.isFlagged === true) || flags > 0) {
      setGameState(flagSquare(gameState, mineSquare));
      setFlags(countFlaggedSquares(gameState));
    }
  }

  function secondsToTimerString(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const displayMin =
      minutes < 1 ? "00" : minutes < 10 ? `0${minutes}` : minutes;
    const displaySec =
      seconds < 1 ? "00" : seconds < 10 ? `0${seconds}` : seconds;
    return `${displayMin}:${displaySec}`;
  }

  function endGame() {
    clearInterval(timer);
  }

  function startNewGame(rows: number, columns: number, numBombs: number) {
    setRows(rows);
    setColumns(columns);
    setGameState(createNewGame(rows, columns, numBombs));
    setStarted(false);
    setFlags(numBombs);
    setElapsedSeconds(0);
    clearInterval(timer);
    setTimer(setInterval(() => {}));
  }

  return (
    <div>
      <div className="menu-container">
        <button
          className="difficulty-button mt-20 beg"
          onClick={(_) => startNewGame(9, 9, 10)}
        >
          Beginner
        </button>
        <button
          className="difficulty-button mt-20 int"
          onClick={(_) => startNewGame(16, 16, 40)}
        >
          Intermediate
        </button>
        <button
          className="difficulty-button mt-20 exp"
          onClick={(_) => startNewGame(16, 30, 99)}
        >
          Expert
        </button>
      </div>
      <div className="icon-container">
        <img src={clockIcon} className="icon-img" alt="" />
        {secondsToTimerString(elapsedSeconds)}
        <br></br>
        <img src={flagIcon} className="icon-img" alt="" />
        {flags}
      </div>
      <MineField
        gameState={gameState}
        onLeftClick={gameState.completed ? () => {} : onLeftClick}
        onRightClick={gameState.completed ? () => {} : onRightClick}
        onDoubleClick={gameState.completed ? () => {} : onDoubleClick}
      />
    </div>
  );
};

export interface GameProps {
  rows: number;
  columns: number;
  numBombs: number;
}
