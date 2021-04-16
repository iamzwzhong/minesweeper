const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}

//routes

//add to the leaderboard
app.post("/leaderboards", async (req,res) => {
    try {
        const {name, difficulty, score} = req.body;
        const newLeaderboardEntry = await pool.query("INSERT INTO leaderboard (name, difficulty, score) VALUES ($1,$2,$3) RETURNING *",
        [name, difficulty, score]);

        res.json(newLeaderboardEntry.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
});

//view leaderboard
app.get("/leaderboards/:difficulty", async(req,res)=> {
   try {
        const {difficulty} = req.params;
        const leaderboard = await pool.query("SELECT * FROM leaderboard WHERE difficulty = $1 ORDER BY score",[difficulty]); 
        res.json(leaderboard.rows);
   } catch (error) {
       console.error(error.message);
   } 
});


app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, ()=> {
    console.log(`Server has started on port ${PORT}`);
})