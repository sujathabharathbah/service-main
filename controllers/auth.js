const { axiosPost } = require('../utils/axiosHelper');
const logger = require('../logger');
const { AUTH_ENDPOINT, ACS_TOKEN_ENDPOINT } = require('../config/constants');

/**
 * Authorizes a user by making a POST request to the interface API.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.authorizeUser = async (req, res, next) => {
    try {
        logger.info(
            `taa-service - authorizeUser() - process.env = ${JSON.stringify(process.env)}`
        );

        const INTERFACE_API_URL = process.env['INTERFACE_API_URL'];
        const url = `${INTERFACE_API_URL}${AUTH_ENDPOINT}`;

        logger.info(`taa-service - authorizeUser() - url = ${url}`);

        const data = await axiosPost(url, req.body, req.headers);

        res.status(200).send(data);
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

/**
 * Retrieves an ACS token by making a POST request to the interface API.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getACSToken = async (req, res, next) => {
    try {
        const INTERFACE_API_URL = process.env['INTERFACE_API_URL'];
        const url = `${INTERFACE_API_URL}${ACS_TOKEN_ENDPOINT}`;

        logger.info(`taa-service - getACSToken() - url = ${url}`);
        const data = await axiosPost(url, req.body, req.headers);

        res.status(200).send(data);
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

/**
 * Retrieves session information based on the provided session ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getSession = (req, res, next) => {
    try {
        const sessionId = req.params.sessionId;
        var data = {
            application_name: '<ApplicationName>',
            backend_id: '<BackendId>',
            call_id: '<CallId>',
            datetime: '<SessionDatetime>',
            id: '<SessionId>',
            status: '<SessionStatus>',
            username: '<Username>',
            sessionId,
        };
        res.status(200).send({ status: 200, message: 'Success', data });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

/**
 * Logs out a user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.logout = (req, res, next) => {
    try {
        var data = {
            application_name: '<ApplicationName>',
            backend_id: '<BackendId>',
            call_id: '<CallId>',
            datetime: '<SessionDatetime>',
            id: '<SessionId>',
            status: '<SessionStatus>',
            username: '<Username>',
        };
        res.status(200).send({ status: 200, message: 'Success', data });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};
