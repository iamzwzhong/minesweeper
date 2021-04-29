import React from 'react';
import Square from './Square';

const Board = ({squares, onClick, onDoubleClick, width, height, gameOver, flagCount}) => (
    <div style={{
        border: '4px solid darkblue',
        borderRadius: '10px',
        margin: '0 auto',
        display:'grid', 
        height:'auto',
        width:`${width*40}px`,
        gridTemplate:`repeat(${height},1fr) / repeat(${width},1fr)`,
    }}>
    {squares.map((square,i) =>(
        <Square key={i} value={square} onClick={()=>onClick(i)} onDoubleClick={()=>onDoubleClick(i)} gameOver={gameOver} flagCount={flagCount} index={i}/>
    ))}
    </div>
)

export default Board;


