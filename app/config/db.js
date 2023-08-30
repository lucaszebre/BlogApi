const { Pool } = require('pg');

const connectionConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'blogpost',
    password: 'undefined',
    port: 3001, // The default PostgreSQL port
};

const pool = new Pool(connectionConfig);

module.exports = pool;





