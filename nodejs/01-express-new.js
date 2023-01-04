const express = require("express");

const app = express();

const port = process.env.port || 3001;

app.get('/', (req, res) => {
    res.set("Content-Type", "application/json").send({
        batch: "Batch#1",
        bootcamp: ["NodeJS", "codeXacademy"]
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
