const database = require('./server/config/database');
const express = require('./server/config/express');
const db = database();
const app   = express();

app.listen(3200,() => {
    console.log("Listening on port 3200")
})

