// * IMPORTS
require('dotenv').config();
require('express-async-errors');
// express
const express = require('express');
const app = express();
// packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
// database
const connectDB = require('./db/connect');
// routers
const authRouter = require('./routes/authRoutes');
// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// * MIDDLEWARES
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// * ROUTES

app.get('/', (req, res) => {
  res.send('E-Commerce API');
});
app.get('/api/v1', (req, res) => {
  // console.log(req.cookies);
  console.log(req.signedCookies);
  res.send('E-Commerce API');
});

app.use('/api/v1/auth', authRouter);

// * ERRORS
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// port
const port = process.env.PORT || 5000;
// start
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
