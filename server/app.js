const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const connectDb = require('./database/connectDb');
// require('express-async-errors');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'app/public')));

// ROUTES
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require('./routes/experienceRoutes');

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', skillRoutes);
app.use('/api', experienceRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Index route');
});

// CUSTOM MIDDLEWARES
const Error_Handler_Middleware = require('./middlewares/error-handler');
const Not_Found_Middleware = require('./middlewares/not-found-middleware');
app.use(Error_Handler_Middleware);
app.use(Not_Found_Middleware);

// RUN SERVER
app.listen(process.env.PORT, async () => {
    await connectDb(process.env.MONGO_URI);
    console.log(`Server started on http://localhost:${process.env.PORT}`);
});
