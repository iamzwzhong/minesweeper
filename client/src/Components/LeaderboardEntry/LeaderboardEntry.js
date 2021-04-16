import React from 'react';

import './LeaderboardEntry.css';
import {secondsToTimer} from '../../helpers';

const LeaderboardEntry = ({ leaderboardEntries }) => {

    return (
        <div className="container">
            {leaderboardEntries.map((leaderboardEntry) => (
                <div className="entry">
                    <div className="name">
                        {leaderboardEntry.name}
                    </div>
                    <div className="score">
                        {secondsToTimer(leaderboardEntry.score)}
                    </div>
                </div>
            ))}
        </div>
    )

};

export default LeaderboardEntry;