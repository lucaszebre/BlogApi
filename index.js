const express = require("express");
const app = express();
const port = 3000;
const  dotenv = require('dotenv');
const pool = require('./app/config/db.js')
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
dotenv.config();
const { POSTGRESQL_PASSWORD } = process.env;



async function connectAndQuery() {
    try {
        await pool.connect();
        console.log('Connected to PostgreSQL');
    } catch (error) {
        console.error('Error:', error.message);
    } 
}

connectAndQuery();

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
require("./app/routes/user.routes")(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});