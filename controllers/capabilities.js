/**
 * Controller for managing capabilities
 */

/**
 * Retrieves all capabilities for a specific backend.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getAll = (req, res, next) => {
    try {
        const backendId = req.params.backendId;
        var data = {
            capabilityId: '<capabilityId>',
            capabilityName: '<capabilityName>',
            backendId,
        };
        res.status(200).send({ status: 200, message: 'Success', data });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};
