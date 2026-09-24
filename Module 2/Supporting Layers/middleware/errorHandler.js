/**
 * Central error handler — supporting layers version.
 *
 * AppError lives in utils/AppError.js.
 * Configuration values come from config/index.js.
 */

const config = require('../config');

module.exports = function errorHandler(err, req, res, next) {
    const status = err.statusCode || 500;

    const body = {
        error: err.message || 'Internal Server Error'
    };

    // Only leak stack traces outside production.
    if (config.nodeEnv !== 'production' && err.stack) {
        body.stack = err.stack;
    }

    res.status(status).json(body);
};