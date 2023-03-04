const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "goodreads.db");
const app = express();
const db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is Running");
    });
  } catch (err) {
    console.log("Data Not Found");
    process.exit(1);
  }
};
initializeDBAndServer();

app.get("/books/", async (request, response) => {
  const sqlQuery = `
        SELECT * FROM book
        ORDER BY book_id;
    `;
  const booksArray = await db.all(sqlQuery);
  response.send(booksArray);
});
