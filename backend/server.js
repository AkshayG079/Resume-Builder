const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config/db');
connectToDatabase()

const app = express();
const PORT = 4455;

// app.use(express.json()); by default limit is 100kb
// Increase the payload size limits

app.use(express.json({ limit: '50mb' }));
app.use(cors());

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const resumeRoutes = require('./routes/resume')

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/resume', resumeRoutes)

app.listen(PORT, () => {
    console.log(`Connect to localhost at ${PORT}`)
})




