const express = require('express');
const app = express();
const server = require('http').createServer(app)
global.io = require('socket.io')(server)
const port = process.env.PORT || 3000;
const request = require('request');
const bodyParser  = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const auth = require('./src/routes/authentication')
const push = require('./src/routes/push')
const users = require('./src/routes/users')
const posts = require('./src/routes/posts')

require('./src/config/passport')

app.use(cors());
app.use(bodyParser.json());
app.use('/views', express.static(__dirname + '/src/views'));

//Token handler
app.use((req, res, next) => {
    if(req.headers.authorization){
        const oldResJson = res.json;
        res.json = (body) => {
            res.setHeader("X-Bearer-Token", req.user.generateJWT());
            oldResJson.call(res, body);
        }
    }
    next()
})

app.use('/auth', auth)
app.use('/push', passport.authenticate('jwt', {session: false}), push);
app.use('/user', passport.authenticate('jwt', {session: false}), users);
app.use('/post', passport.authenticate('jwt', {session: false}), posts);

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

/* When a client connects, we note it in the console
global.io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');
});
*/

server.listen(port, () => {
    //socket io server listening
})

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
