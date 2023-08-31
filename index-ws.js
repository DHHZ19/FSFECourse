const express = require("express");
const server = require("http").createServer();
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);
server.listen(3000, () => console.log(`server started on PORT ${PORT}`));

process.on("SIGINT", () => {
  wss.clients.forEach(function each(client) {
    client.close();
  });
  server.close(() => {
    shutdownDB();
  });
});

/** Begin websockets **/

const WEBSOCKETSERVSER = require("ws").Server;

const wss = new WEBSOCKETSERVSER({ server: server });

wss.on("connection", function connection(ws) {
  const numClients = wss.clients.size;
  console.log(`Clients conntected ${numClients}`);

  wss.broadcast(`Current visitors: ${numClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send("Welcome to my server");
  }

  db.run(`INSERT INTO visitors (count, time) 
      VALUES (${numClients}, datetime('now'))
  `);

  ws.on("close", function close() {
    console.log("A client has disconnected"),
      wss.broadcast(`Current visitors: ${numClients}`);
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};
/** End websockets **/

/** Begin Databases **/
const sqlite = require("sqlite3");
const db = new sqlite.Database(":memory:");

db.serialize(() => {
  db.run(
    `
    CREATE TABLE visitors (
      count INTEGER,
      time TEXT

    )
    `
  );
});

function getCounts() {
  db.each("SELECT  * FROM visitors", (err, row) => {
    console.log(row);
  });
}

function shutdownDB() {
  getCounts();
  console.log("Shutting down db");
  db.close();
}
/** End Databases **/
