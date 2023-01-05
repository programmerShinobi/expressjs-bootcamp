import "dotenv/config"
import express from "express"
import models, { sequelize } from "./models/init-models"
import routes from "./routes/indexRoutes"

const port = process.env.port || 3001

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(async (req, res, next) => {
    req.context = { models };
    next();
});

app.use(routes)

const dropDatabaseSync = false;
sequelize.sync({ force: dropDatabaseSync })
    .then(() => {
        console.info("Database do not drop")
    })

// app.use('/eshopay/', (req, res) => {
//     res.set("Content-Type", "application/json")
//         .send(JSON.stringify({
//             batch: "Batch#1",
//             bootcamp: ["NodeJS", "codeXacademy"]
//         }));
//     // res.send('Hello Eshopay');
// });

app.listen(port, () => {
    console.info(`Success! ${port}`)
})
