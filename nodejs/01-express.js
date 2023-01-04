const express = require("express");

const app = express();

const port = process.env.port || 3001;

app.listen(port, () => { `Server listening on port ${port}` });

console.info(`Server listening on port ${port}`);

app.get('/', (req, res) => {
    res.send(JSON.stringify({
        batch: "Batch#1",
        bootcamp: ["NodeJS", "codeXacademy"]
    }));
});
