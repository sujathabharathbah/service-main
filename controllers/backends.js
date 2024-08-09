/**
 * Controller for managing backend operations
 */

/**
 * Retrieves all backend information.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getAll = async (req, res, next) => {
    try {
        var data = {
            id: '<BackendId>',
            name: '<BackendName>',
        };
        res.status(200).send({ status: 200, message: 'Success', data });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};
