/**
 * @fileoverview Custom logger configuration using Winston.
 * This file sets up a custom logger with a specific format and console transport.
 */
const { format, createLogger, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

/**
 * @constant
 * @type {function}
 * @description Custom format function for log messages.
 * @param {Object} info - The log information object.
 * @param {string} info.level - The log level (e.g., 'info', 'error').
 * @param {string} info.message - The log message.
 * @param {string} info.label - The label for the log (e.g., service name).
 * @param {string} info.timestamp - The timestamp of the log.
 * @returns {string} Formatted log string.
 */
const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

/**
 * @constant
 * @type {Winston.Logger}
 * @description Configured Winston logger instance.
 */
const logger = createLogger({
    level: 'debug',
    format: combine(label({ label: 'caa-service' }), timestamp(), customFormat),
    transports: [new transports.Console()],
});

module.exports = logger;
