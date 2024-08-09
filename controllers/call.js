const { axiosPost } = require('../utils/axiosHelper');
const logger = require('../logger');
const { CALL_ENDPOINT } = require('../config/constants');

/**
 * Controller for managing call operations
 */

/**
 * Initiates a new call.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.makeCall = async (req, res, next) => {
    try {
        const INTERFACE_API_URL = process.env['INTERFACE_API_URL'];
        const url = `${INTERFACE_API_URL}${CALL_ENDPOINT}`;

        logger.debug(`taa-service - makeCall() - url = ${url}`);

        const data = await axiosPost(url, req.body, req.headers);

        res.status(200).send(data);
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

/**
 * Retrieves call data for a specific call ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getCallData = (req, res, next) => {
    try {
        const callId = req.params.callId;
        var data = {
            id: callId,
            session_id: '<SessionId>',
            status: '<CallStatus>',
        };
        res.status(200).send({ status: 200, message: 'Success', data });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

/**
 * Ends a call for a specific call ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.endCall = (req, res, next) => {
    try {
        const callId = req.params.callId;
        var data = {
            id: callId,
            session_id: '<SessionId>',
            status: '<CallStatus>',
        };
        res.status(200).send({ status: 200, message: 'Success', data });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};
