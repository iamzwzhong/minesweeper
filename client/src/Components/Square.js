import React, {useState} from 'react';

import DoubleClick from './DoubleClick';

import flagIcon from '../Icons/flag.png';
import mineIcon from '../Icons/mine.png';


const colors = {
    1: 'blue',
    2: 'green',
    3: 'red',
    4: 'purple',
    5: 'brown',
    6: 'cyan',
    7: 'black',
    8: 'gray'
}

const Square = ({value, onClick, onDoubleClick, gameOver, flagCount, index}) => {
    const [flagged, setFlagged] = useState(false);

    let bg_color = 'lightblue';
    let cursor = 'pointer';

    if (value > 0) {
        bg_color = 'lightgray';
        cursor = 'default';
    }

    const style = {
        background: bg_color,
        border: '2px solid darkblue',
        height: '40px',
        width:'40px',
        fontWeight: '800',
        cursor: cursor,
        outline: 'none',
        color: colors[value]
    };

    let img_bg = 'lightblue';

    if (value === "EB") {
        img_bg = "red";
    }

    const imgstyle = {
        height:'90%',
        width:'90%',
        border: '2px solid darkblue',
        background: img_bg
    };

    const flag = (e)=> {
        e.preventDefault();
        setFlagged(!flagged);
        flagCount(flagged,index);
    }
    
    return (    
    value > 0
    ?
    <DoubleClick onDoubleClick={onDoubleClick} value = {value} style = {style}/>
    :value === 'BB' || value === 'EB'
    ?
    <img src={mineIcon} style={imgstyle}/>
    :value == 0
    ?
    <button style={{
        background: 'lightgray',
        border: '2px solid darkblue',
        height: '40px',
        width:'40px',
        fontWeight: '800',
        cursor: 'pointer',
        outline: 'none',
    }} onClick={onClick} disabled={gameOver}>

    </button>
    : !flagged
    ?
    <button style={style} onClick={onClick} onContextMenu={flag} disabled={gameOver}>

    </button> 
    :
    <img src={flagIcon} style={imgstyle} onContextMenu={flag} disabled={gameOver}/>
    )
}

export default Square;


