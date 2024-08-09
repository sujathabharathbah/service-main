/**
 * @fileoverview Module that provides wrapper functions for making HTTP requests using axios.
 * It includes functions for GET and POST requests, along with error handling.
 */
const axios = require('axios');
const logger = require('../logger');

/**
 * Performs a GET request using axios.
 * @param {string} url - The URL to send the GET request to.
 * @param {Object} config - The configuration options for the request.
 * @returns {Promise<any>} The response data from the server.
 * @throws {Error} If the request fails.
 */
const axiosGet = async (url, config) => {
    try {
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        handleError(error, url);
    }
};

/**
 * Performs a POST request using axios.
 * @param {string} url - The URL to send the POST request to.
 * @param {Object} requestBody - The data to be sent in the request body.
 * @param {Object} headers - The headers to be sent with the request.
 * @returns {Promise<any>} The response data from the server.
 * @throws {Error} If the request fails.
 */
const axiosPost = async (url, requestBody, headers) => {
    try {
        const response = await axios.post(url, requestBody, headers);
        return response.data;
    } catch (error) {
        handleError(error, url);
    }
};

/**
 * Handles errors that occur during HTTP requests.
 * Logs different types of errors and rethrows the error.
 * @param {Error} error - The error object caught during the request.
 * @param {string} [url=''] - The URL of the request that caused the error.
 * @throws {Error} The original error is rethrown after logging.
 */
const handleError = (error, url = '') => {
    if (error.response) {
        // Server responds with a status code that falls out of the range of 2xx
        logger.error(
            'Response error - Server responds with a status code that falls out of the range of 2xx: ' +
                error
        );
        const { data: err_message, status, headers } = error.response;
        const error_json = {
            err_message,
            status,
            headers,
            url,
        };
        logger.error('Response error: ', error_json);
        logger.error('Response error message: ', err_message);
    } else if (error.request) {
        // Request was made but no response received
        logger.error(
            `Request was made but no response received for url, ${url}`
        );
        logger.error('Request error: ', error.message);
    } else {
        // Something happened in setting up the request that triggered the error
        logger.error(
            'Something happened in setting up the request that triggered the error'
        );
        logger.error('Request error: ', error.message);
    }
    // Rethrow the error
    throw error;
};

module.exports = { axiosGet, axiosPost };
