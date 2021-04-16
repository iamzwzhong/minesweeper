import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import { calculateWinner, placeBombs, findZeroes, revealBombs, secondsToTimer} from '../../helpers';
import AddModal from '../LeaderboardEntry/AddModal'
import Board from '../Board';

import flagIcon from '../../Icons/flag.png';
import clockIcon from '../../Icons/clock.png';
import trophyIcon from '../../Icons/trophy.png';

import './Game.css';


const Game = ({location}) => {
    const [height, setHeight] = useState(8);
    const [width, setWidth] = useState(8);
    const [bombs, setBombs] = useState(10);
    const [board, setBoard] = useState(Array(64).fill(0));

    const [gameOver, setGameOver] = useState(false);
    const [boardID, setBoardID] = useState(1);
    const [bombsDisplayed, setBombsDisplayed] = useState(10);
    const [firstClick, setFirstClick] = useState(true);

    const [seconds, setSeconds] = useState(0);
    const [timer, setTimer] = useState(null);
    const [bestTime, setBestTime] = useState(null);

    const [modalVisible, setModalVisible] = useState(true);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        let {height,width,bombs} = queryString.parse(location.search);
        height = parseInt(height);
        width = parseInt(width);
        bombs = parseInt(bombs);

        setHeight(height);
        setWidth(width);
        setBombs(bombs);
        setBombsDisplayed(bombs);
        setBoard(placeBombs(bombs, height, width));

    },[location.search]);

    const handleClick = i => {

        if (firstClick) {
            setFirstClick(false);
            setTimer(setInterval(()=>{
                setSeconds(seconds => seconds+1);
            },1000));
        }

        const boardCopy = [...board];
        if (boardCopy[i] < 0) {
            boardCopy[i] = boardCopy[i] * -1;
            let checkwin = calculateWinner(boardCopy);
            if (checkwin) {
                setGameOver(true);
                clearInterval(timer);
                if (bestTime === null) {
                    setBestTime(seconds);
                }
                else {
                    setBestTime(Math.min(bestTime,seconds));
                }
                setWinner(true);
            }
        }
        else if (boardCopy[i] === null) {
            const y = Math.floor(i / width);
            const x = i % width;
            findZeroes(boardCopy,x,y,height,width);
        }
        else if (boardCopy[i] === 'B') {
            revealBombs(boardCopy,i);
            setGameOver(true);
            clearInterval(timer);
            setWinner(false);
        }
        
        setBoard(boardCopy);
    }

    const resetGame = () => {
        setBoard(placeBombs(bombs, height, width));
        setBoardID(boardID+1);
        setGameOver(false);
        setBombsDisplayed(bombs);
        setFirstClick(true);
        clearInterval(timer);
        setTimer(null);
        setSeconds(0);
        setWinner(null);
    }

    const flagCount = (flagged) => {
        if (flagged) {
            setBombsDisplayed(bombsDisplayed+1);
        }
        else {
            setBombsDisplayed(bombsDisplayed-1);
        }
    }

    const toggleModal = () => {
        setModalVisible(false);
    };

    return (
        <div className='gameOuterContainer'>
            <div className='header'>
                <img src={trophyIcon} class="imgStyle"/>
                {secondsToTimer(bestTime)}
                <br></br>
                <img src={clockIcon} class="imgStyle"/>
                {secondsToTimer(seconds)}
                <br></br>
                <img src={flagIcon} class="imgStyle"/>
                {bombsDisplayed}  
            </div>
            <Board key={boardID} squares={board} onClick={handleClick} width = {width} height={height} gameOver = {gameOver} flagCount={flagCount}/>
            <div className='gameMenuContainer'>
                {winner === false ? (<div className="postMessage lost">Better luck next time!</div>) 
                : <div></div>}
                <AddModal winner = {winner} modalVisible={modalVisible} onClick={toggleModal} score={seconds} bombs={bombs}/>
                <button className ='button mt-20' onClick={resetGame}>Reset</button>
                <Link to={`/`}>
                <button className='button mt-20' type="submit">Menu</button>
                </Link>
            </div>
        </div>
    )
}

export default Game;


