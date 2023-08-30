const express = require("express");
const app = express();
const port = 3000;
const Pool = require('pg').Pool
const  dotenv = require('dotenv');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
dotenv.config();
const { POSTGRESQL_PASSWORD } = process.env;

const connectionConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'blogpost',
    password: 'undefined',
    port: 3001, // The default PostgreSQL port
};

const client = new Pool(connectionConfig);

async function connectAndQuery() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await client.end();
        console.log('Connection to PostgreSQL closed');
    }
}

connectAndQuery();

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});