import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import { calculateWinner, placeBombs, findZeroes, revealBombs, secondsToTimer, canDoubleClick} from '../../helpers';
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

    const [flaggedIndex , setFlaggedIndex] = useState(new Set());

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

    const doubleClick = i => {
        const boardCopy = [...board];
        const y = Math.floor(i / width);
        const x = i % width;
        let lose = canDoubleClick(boardCopy, x, y, height, width, flaggedIndex);
        if (lose) {
            console.log('lose');
            setGameOver(true);
            clearInterval(timer);
            setWinner(false);
            setBoard(boardCopy);
            return;
        }

        let checkwin = calculateWinner(boardCopy);
        if (checkwin) {
            console.log(winner);
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
        flaggedIndex.clear();
        setFlaggedIndex(flaggedIndex);
        setModalVisible(true);
    }

    const flagCount = (flagged, index) => {

        if (flagged) {
            setBombsDisplayed(bombsDisplayed+1);
            flaggedIndex.delete(index);
        }
        else {
            setBombsDisplayed(bombsDisplayed-1);
            flaggedIndex.add(index);
        }
        setFlaggedIndex(flaggedIndex);
    }

    const toggleModal = () => {
        setModalVisible(false);
    };

    return (
        <div className='gameOuterContainer'>
            <div className='header'>
                <img src={trophyIcon} className="imgStyle"/>
                {secondsToTimer(bestTime)}
                <br></br>
                <img src={clockIcon} className="imgStyle"/>
                {secondsToTimer(seconds)}
                <br></br>
                <img src={flagIcon} className="imgStyle"/>
                {bombsDisplayed}  
            </div>
            <Board key={boardID} squares={board} onClick={handleClick} onDoubleClick = {doubleClick} width = {width} height={height} gameOver = {gameOver} flagCount={flagCount}/>
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


