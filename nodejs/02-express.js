const express = require("express");

const app = express();

const Pool = require("pg").Pool;
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "root",
    database: "hr-db",
    port: 5432
});

const port = process.env.port || 3001;

app.listen(port, () => { `Server listening on port ${port}` });

console.info(`Server listening on port ${port}`);

// buat CRUD with SQL : table regions
app.get("/api/v1/regions", (req, res) => {

    /**
     * call pool fo query, param ke 1 : sql
     * param 2 : binding parameter
     * param 3 : result callback
     */

    //call pool for query
    pool.query(`SELECT region_id, region_name FROM regions`,
        [],
        (error, result) => {
            if (error) {
                throw error;
            }
            res.status(200).json(result.rows);
        }
    )

});

// buat CRUD with SQL : table employees
app.get("/api/v1/employees", (req, res) => {

    /**
     * call pool fo query, param ke 1 : sql
     * param 2 : binding parameter
     * param 3 : result callback
     */

    //call pool for query
    pool.query(`SELECT * FROM employees`,
        [],
        (error, result) => {
            if (error) {
                throw error;
            }
            res.status(200).json(result.rows);
        }
    )

})
