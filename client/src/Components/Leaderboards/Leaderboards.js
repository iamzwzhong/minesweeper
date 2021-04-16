import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import LeaderboardEntry from '../LeaderboardEntry/LeaderboardEntry';

import './Leaderboards.css';
import './Pagination.css';

const Leaderboards = () => {

    const [leaderboardEntries, setLeaderboardEntries] = useState([]);

    const [pageNumber, setPageNumber] = useState(0);
    const leaderboardEntriesPerPage = 10;
    const pagesVisited = pageNumber * leaderboardEntriesPerPage;

    useEffect(() => {
      toggleBeginner();
  },[]);


    const toggleBeginner = async() => {
      try {
        const response = await fetch(`/leaderboards/Beginner`);
        const jsonData = await response.json();
        setLeaderboardEntries(jsonData);
        setPageNumber(0);
      } catch (error) {
        console.error(error.message);
      }
    }

    const toggleIntermediate = async() => {
      try {
        const response = await fetch(`/leaderboards/Intermediate`);
        const jsonData = await response.json();
        setLeaderboardEntries(jsonData);
        setPageNumber(0);
      } catch (error) {
        console.error(error.message);
      }
    }

    const toggleExpert = async() => {
      try {
        const response = await fetch(`/leaderboards/Expert`);
        const jsonData = await response.json();
        setLeaderboardEntries(jsonData);
        setPageNumber(0);
      } catch (error) {
        console.error(error.message);
      }
    }

    const currentLeaderboardEntries = leaderboardEntries.slice(pagesVisited, pagesVisited + leaderboardEntriesPerPage);
    const pageCount = Math.ceil(leaderboardEntries.length/leaderboardEntriesPerPage);

    const changePage = ({selected}) => {
      setPageNumber(selected);
    }

    return (
      <div className="leaderboardsOuterContainer">
        <Link to={`/`}>
            <button className='button btn-margin def' type="submit">Menu</button>
        </Link>
        <div className="buttonSelectors">
          <button className='l_button btn-margin beg' type="submit" onClick={toggleBeginner}>Beginner</button>
          <button className='l_button btn-margin int' type="submit" onClick={toggleIntermediate}>Intermediate</button>
          <button className='l_button btn-margin exp' type="submit" onClick={toggleExpert}>Expert</button>
        </div>
        <hr className="line"></hr>
        <ReactPaginate
                  previousLabel={"<<"}
                  nextLabel={">>"}
                  breakLabel={"..."}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={1}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  forcePage={pageNumber}
                  containerClassName={"pagination-btn"}
                  disabledClassName={'pagination-disabled'}
                  activeClassName={'pagination-active'}
        />
        <LeaderboardEntry leaderboardEntries={currentLeaderboardEntries}/>
      </div>
      

    );
}

export default Leaderboards;


