import React from 'react';

let timer;

const DoubleClick = ({onClick = () => {}, onDoubleClick = () => {}, style, value}) => {

    const onClickHandler = event => {
        clearTimeout(timer);
        if (event.detail === 1) {
            timer = setTimeout(onClick, 200)
        } else if (event.detail === 2) {
            onDoubleClick()
        }
    }
    return (
        <button style={style} onClick = {onClickHandler}>
            {value}
        </button>
    )
}

export default DoubleClick;


