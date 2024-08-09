const { postEmail } = require('../utils/emailHelper');

/**
 * Send email using the request data.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.sendEmail = async (req, res, next) => {
    try {
        const data = await postEmail(req.body);
        res.status(200).send(data);
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};
