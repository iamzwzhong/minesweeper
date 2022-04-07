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
import singleClickEffect from "../../Assets/Audio/SingleClick.mp3";
import doubleClickEffect from "../../Assets/Audio/DoubleClick.mp3";
import mineExplodeEffect from "../../Assets/Audio/MineExplode.mp3";
import flagActionEffect from "../../Assets/Audio/FlagAction.mp3";
import winEffect from "../../Assets/Audio/Win.mp3";
import { Field } from "../../Types/Field";
import { GameState } from "../../Types/GameState";
import { GameStatus } from "../../Types/GameStatus";

export const Game = (props: GameProps) => {
  const [rows, setRows] = useState(props.rows);
  const [columns, setColumns] = useState(props.columns);
  const [numMines, setNumMines] = useState(props.numMines);
  const [gameState, setGameState] = useState(
    createNewGame(rows, columns, numMines)
  );
  const [started, setStarted] = useState(false);
  const [flags, setFlags] = useState(numMines);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timer, setTimer] = useState(setInterval(() => {}));

  function playAudio(audioSource: string) {
    const audioSrcVolume = (audioSource: string) => {
      switch (audioSource) {
        case singleClickEffect || doubleClickEffect:
          return Number(1);
        case mineExplodeEffect:
          return Number(0.15);
        case flagActionEffect:
          return Number(0.25);
        case winEffect:
          return Number(0.5);
        default:
          return Number(1);
      }
    };

    const audio = new Audio(audioSource);
    audio.volume = audioSrcVolume(audioSource);
    audio.play();
    audio.onended = function () {
      audio.src = "";
      audio.remove();
      audio.srcObject = null;
    };
  }

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
      numMines -
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
    playAudio(singleClickEffect);
    const gameStatus = updatedGameState.status;
    if (gameStatus !== GameStatus.InProgress) {
      if (gameStatus === GameStatus.Fail) playAudio(mineExplodeEffect);
      endGame(gameStatus);
    }
    setGameState(updatedGameState);
  }

  function onDoubleClick(mineSquare: Field) {
    const squaresToOpen: Field[] = getSquaresToOpen(gameState, mineSquare);
    let currGameState = gameState;
    for (let i = 0; i < squaresToOpen.length; i++) {
      currGameState = openSquare(currGameState, squaresToOpen[i]);
    }

    if (squaresToOpen.length === 1) playAudio(singleClickEffect);
    else if (squaresToOpen.length > 1) playAudio(doubleClickEffect);

    const gameStatus = currGameState.status;
    if (gameStatus !== GameStatus.InProgress) {
      if (gameStatus === GameStatus.Fail) playAudio(mineExplodeEffect);
      endGame(gameStatus);
    }
    setGameState(currGameState);
  }

  function onRightClick(mineSquare: Field) {
    if ((flags === 0 && mineSquare.isFlagged === true) || flags > 0) {
      playAudio(flagActionEffect);
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

  function endGame(status: GameStatus) {
    if (status === GameStatus.Success) playAudio(winEffect);
    clearInterval(timer);
  }

  function startNewGame(rows: number, columns: number, numMines: number) {
    setRows(rows);
    setColumns(columns);
    setNumMines(numMines);
    setGameState(createNewGame(rows, columns, numMines));
    setStarted(false);
    setFlags(numMines);
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
        onLeftClick={
          gameState.status !== GameStatus.InProgress ? () => {} : onLeftClick
        }
        onRightClick={
          gameState.status !== GameStatus.InProgress ? () => {} : onRightClick
        }
        onDoubleClick={
          gameState.status !== GameStatus.InProgress ? () => {} : onDoubleClick
        }
      />
    </div>
  );
};

export interface GameProps {
  rows: number;
  columns: number;
  numMines: number;
}
