//--------------------------------------------------------------// #1 run => check port  

import "dotenv/config";
import express from "express";
import { sequelize } from "./models/init-models";
// import models, { sequelize } from "./models/init-models";
import routes from "./routes/indexRoutes";

const port = process.env.port || 3001;

const app = express();

app.listen(port, () => {
    console.info(`Server started http://localhost:${port}`)
});

//--------------------------------------------------------------// #2 : run => check connection (req,res) in postman

// app.use('/eshopay/', (req, res) => {
//     res.set("Content-Type", "application/json")
//         .send(JSON.stringify({
//             batch: "Batch#1",
//             bootcamp: ["NodeJS", "codeXacademy"]
//         }));
//     // res.send('Hello Eshopay');
// });

//--------------------------------------------------------------// #3 : run syntax JSON

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(async (req, res, next) => {
//     req.context = { models };
//     next();
// });

//--------------------------------------------------------------// #3 : run => auto reset database

const dropDatabaseSync = false;
sequelize.sync({ force: dropDatabaseSync })
    .then(() => {
        console.info("Database do not drop")
    });

//--------------------------------------------------------------// #3 : run => routing in postman

app.use(routes);