class AppError extends Error {
    constructor(message, statusCode, isOperational = true, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            success: false,
            message: this.message,
            errors: this.errors
        };
    }
}

module.exports = AppError;