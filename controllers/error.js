const logger = require('../logger');

/**
 * Controller for handling errors
 */

/**
 * Handles 404 Not Found errors.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.get404 = (req, res) => {
    logger.error('Error: Page not found error occured: ', req.originalUrl);
    res.status(404).send({ status: 404, error: 'Page not found' });
};

/**
 * Handles 500 Internal Server errors.
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.get500 = (err, req, res) => {
    logger.error('Error: Internal server error occured: ' + err);
    res.status(500).send({
        status: 500,
        error: 'Internal Error Occured - ' + err.message,
    });
};
