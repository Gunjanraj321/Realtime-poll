require('dotenv').config();
const express = require('express');
const userRoutes = require('./router/userRoute');
const pollRoutes = require('./router/pollRouter');
const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(pollRoutes);

const mongoose = require('mongoose');
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));

const port = 3001;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})