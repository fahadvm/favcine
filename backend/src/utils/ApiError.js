/**
 * Custom Error class for API specific errors
 */
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Flag to distinguish custom errors from internal ones

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;
