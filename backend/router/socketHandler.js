// // socketHandler.js
// const io = require('socket.io')(server);


// const socketHandler = (server) => {
//   io.on('connection', (socket) => {
//     console.log('A user connected');

//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });

//     socket.on('vote', (poll) => {
//       io.emit('vote', poll);
//     });
//   });

// };


// module.exports = { socketHandler };
