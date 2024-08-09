/**
 * @fileoverview Constants used throughout the taa-service application.
 * This file defines various API endpoints and other constant values.
 */
const constants = {
    /**
     * @property {string} AUTH_ENDPOINT
     * @description The endpoint for authentication requests.
     */
    AUTH_ENDPOINT: '/auth',

    /**
     * @property {string} ACS_TOKEN_API_ENDPOINT
     * @description The endpoint for retrieving Azure Communication Services (ACS) tokens.
     */
    ACS_TOKEN_ENDPOINT: '/auth/acsToken',

    /**
     * @property {string} CALL_ENDPOINT
     * @description The endpoint for initiating or managing calls.
     */
    CALL_ENDPOINT: '/call',

    /**
     * @property {string} ROOM_ENDPOINT
     * @description The endpoint for creating a room.
     */
    ROOM_ENDPOINT: '/room/createRoom',
};

module.exports = constants;
