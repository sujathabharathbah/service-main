/**
 * Main application file for the api.
 * Sets up the Express server, configures middleware, defines routes, and handles errors.
 */
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');

const logger = require('./logger');
const authRouter = require('./routes/auth');
const backendsRouter = require('./routes/backends');
const callRouter = require('./routes/call');
const capabilitiesRouter = require('./routes/capabilities');
const roomRouter = require('./routes/room');
const emailRouter = require('./routes/email');
const errorController = require('./controllers/error');

/**
 * Initialize Express application
 */
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

/**
 * Set up server port and environment
 */
const port = process.env.PORT || 80;
app.set('port', port);

/**
 * Route definitions
 */
app.use('/auth', authRouter);
app.use('/backends', backendsRouter);
app.use('/call', callRouter);
app.use('/room', roomRouter);
app.use('/capabilities', capabilitiesRouter);
app.use('/', emailRouter);

/**
 * Test route - can be removed later. Added only for testing purpose
 */
app.get('/', (req, res) => {
    logger.info("Default success log with '/' route");
    res.status(200).send({ status: 200, message: 'Success' });
});

/**
 * Error handling middleware
 */
app.use(errorController.get404);
app.use((error, req, res, next) => {
    errorController.get500(error, req, res, next);
});

/**
 * Start the server
 */
app.listen(port, () => {
    logger.info(
        `caa-service started on port ${app.get(
            'port'
        )} and environment : ${app.get('env')}`
    );
});
