const express = require('express');
const cors = require('cors');
const copypastaRoutes = require('./src/routes/Copypasta.routes');
const { pool } = require('./src/config/db');

require('dotenv').config();
const app = express();

pool.connect().then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log('Error connecting to database', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.use('/api/copypasta', copypastaRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});