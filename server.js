const mongoose = require('./server/config/mongoose');
const express = require('./server/config/express');
const db = mongoose();
const app     = express();

app.listen(3200, () => {
    console.log('You are using on port 3200!!!!');
});
