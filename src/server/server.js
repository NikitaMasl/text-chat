const express = require('express');
const bodyParser = require('body-parser');
const uniqid = require('uniqid');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getAllUsers } = require('./utils/users');

const app = express();
const PORT = 8080;
const path = require('path');


app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next()
})

require('./routes')(app);

const webpack = require('webpack');
const config = require(path.join(__dirname, '../../webpack.config'));
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
        stats: 'errors-only'
    }));

app.use(require('webpack-hot-middleware')(compiler));

const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

server.listen(PORT, () => {
    console.log(`Server listening port: ${PORT}`);
});

const users = {};

const socketToRoom = {};

//Run when client connections
io.sockets.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        if(user){
            socket.join(user.room)

            //Notification about new user in the chat
            socket.broadcast.to(user.room).emit('message', formatMessage(uniqid(), user.username, 'has joined the chat ', true, user.room));

            //Greeting
            socket.emit('message', formatMessage(uniqid(), '', 'Welcome to the chat!', true, user.room));

            //Send user an room info 
            io.emit('roomUsers', getAllUsers());
        }
    })

    //Listen for a message
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        if(user){
            io.emit('message', formatMessage(uniqid(), user.username, msg, false, user.room))
        }
    });

    
    //User disconection
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)
        if(user){
            io.emit('message', formatMessage(uniqid(), user.username,' has disconnected ', true, user.room))
        }
    })

    //Video stream
    socket.on("join room", roomID => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });
    socket.on("stop video", () => {
        io.emit('stop video')
    })
});

module.exports = app
