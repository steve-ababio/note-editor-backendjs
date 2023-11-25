const pg = require("pg");
const { Pool } = pg;
let pool = null;

exports.createDatabaseConnection = async function createDatabaseConnection() {
    pool = new Pool({
        ssl:true,
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        password: process.env.POSTGRES_PASSWORD,
        port: parseInt(process.env.POSTGRES_PORT),
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


