/**
 * Controller for managing room operations
 */

const { axiosPost } = require('../utils/axiosHelper');
const logger = require('../logger');
const { ROOM_ENDPOINT } = require('../config/constants');

/**
 * Creates a new room.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.createRoom = async (req, res, next) => {
    try {
        const INTERFACE_API_URL = process.env['INTERFACE_API_URL'];
        const url = `${INTERFACE_API_URL}${ROOM_ENDPOINT}`;

        logger.debug(`taa-service - createRoom() - url = ${url}`);

        const data = await axiosPost(url, req.body, req.headers);

        res.status(200).send(data);
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};
