const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');
const bodyParser  = require('body-parser');
const cors = require('cors');

const push = require('./src/routes/push')

app.use(cors());
app.use(bodyParser.json());

app.use('/push', push)

app.listen(port);
console.log(`
────────────────▄────────────────
──────────────▄▀░▀▄──────────────
────────────▄▀░░░░░▀▄────────────
──────────▄▀░░░░░░░░░▀▄──────────
────────▄█▄▄▄▄▄▄▄▄▄▄▄▄▄█▄────────
───────▄▀▄─────────────▄▀▄───────
─────▄▀░░░▀▄─────────▄▀░░░▀▄─────
───▄▀░░░░░░░▀▄─────▄▀░░░░░░░▀▄───
─▄▀░░░░░░░░░░░▀▄─▄▀░░░░░░░░░░░▀▄─
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
Server running, listening on port ${port}!
`);

//404 handler
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
    //res.sendFile('/404.html', {root: __dirname });
});
//Internal server error handler
app.use((err, req, res, next) => {
    if(err.stack) console.error(err.stack);
    res.status(500).send({
        success: false,
        message: 'Internal server error',
        result: err
    });
});