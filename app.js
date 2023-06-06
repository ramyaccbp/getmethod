const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
const dbPath = path.join(__dirname, "cricketTeam.db");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server has started");
    });
  } catch (e) {
    console.log(`DB 
    error:${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();
app.get(`/players/`, (request, response) => {
  const playersList = `select playerName from cricket_team; `;
  const players = db.all(playersList);
  response.send(players);
});
