import React from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';
import titlePNG from '../../Icons/title.png'

const Menu = () => {

    return (
      <div className="menuOuterContainer">
        <div className="menuInnerContainer">
          <img src={titlePNG}/>
            <Link to={`/game?height=8&width=8&bombs=10`}>
              <button className='button mt-20 beg' type="submit">Beginner</button>
            </Link>
            <Link to={`/game?height=16&width=16&bombs=40`}>
              <button className='button mt-20 int' type="submit">Intermediate</button>
            </Link>
            <Link to={`/game?height=16&width=30&bombs=99`}>
              <button className='button mt-20 exp' type="submit">Expert</button>
            </Link>
        </div>
      </div>
        

    );
}

export default Menu;


