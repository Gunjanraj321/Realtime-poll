require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const userRoutes = require('./router/userRoute');
const pollRoutes = require('./router/pollRouter');
const commentRoutes = require('./router/commentRoute');
const socketHandler = require('./router/socketHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

// Use routes
app.use(userRoutes);
app.use(pollRoutes);
app.use(commentRoutes);

// MongoDB connection
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

// Initialize socket handler
socketHandler(io);

// Start server
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});