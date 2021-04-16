CREATE DATABASE leaderboards;

CREATE TABLE leaderboard(
    record_id SERIAL PRIMARY KEY,
    name VARCHAR(16),
    difficulty VARCHAR(16),
    score INTEGER
);