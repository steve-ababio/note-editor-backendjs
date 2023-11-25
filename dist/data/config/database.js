const pg = require("pg");
const { Pool } = pg;
let pool = null;

exports.createDatabaseConnection = async function createDatabaseConnection() {
    pool = new Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: parseInt(process.env.PG_PORT),
    });
    try {
        await pool.connect();
        pool.query(`CREATE TABLE IF NOT EXISTS notes 
            (
                id serial PRIMARY KEY,
                note TEXT NOT NULL,
                title VARCHAR(70) NOT NULL,
                datecreated TIMESTAMP NOT NULL ,
                lastmodified TIMESTAMP NOT NULL
            )`);
        console.log("database successfully connected");
    }
    catch (error) {
        throw error;
    }
}
exports.getPool = function getPool() {
    return pool;
}


