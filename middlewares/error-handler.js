const { StatusCodes } = require('http-status-codes');

const ErrorHandlerMiddleware = (err, req, res, next) => {
    let baseError = {
        name: err.name || 'Error',
        message: err.message || 'Something went wrong',
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };

    if (err.name === 'ValidationError') {
        baseError = {
            name: err.name,
            message: err.message,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        };
    }

    if (err.name === 'Un_Authenticated') {
        baseError = {
            name: err.name,
            message: err.message,
            status: 'fail',
            statusCode: StatusCodes.UNAUTHORIZED,
        };
    }

    if (err.name === 'BAD_REQUEST') {
        baseError = {
            name: err.name,
            message: err.message,
            statusCode: StatusCodes.BAD_REQUEST,
        };
    }

    if (err.name === 'TypeError') {
        baseError = {
            name: 'TypeError',
            message: err.message,
            statusCode: StatusCodes.BAD_REQUEST,
        };
    }

    if (err.code && err.code === 11000) {
        console.log(err);
        baseError = {
            name: 'KeyValueError',
            message: `Duplicated Value error [${Object.keys(err.keyValue).join(
                ', '
            )}]`,
            statusCode: StatusCodes.BAD_REQUEST,
        };
    }

    return res.status(baseError.statusCode).json(baseError);
};

module.exports = ErrorHandlerMiddleware;
