const express = require("express");
const app = express();

const Pool = require("pg").Pool;
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "root",
    database: "hr-db",
    port: 5432
})

const port = process.env.port || 3001;

app.listen(port, () => {
    console.info(`Server listening on port ${port}`);
});


app.get('/', (req, res) => {
    res.set("Content-Type", "application/json")
        .send(JSON.stringify({
            batch: "Batch#1",
            bootcamp: ["NodeJS", "codeXacademy"]
        }));
});

app.get("api/v1/regions", (req, res) => {
    pool.query(`SELECT * FROM regions`),
        [],
        (error, result) => {
            if (error) {
                throw error;
            }
            res.status(200).json(result.rows);
        }
})