import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { TGenericErrorResponse } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    //setting default values
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorMessage: string = err;
    let errorDetails: string | null = err;

    const assignErrorDetails = (simplifiedError: TGenericErrorResponse) => {
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    };

    // zod error
    if (err instanceof ZodError) {
        assignErrorDetails(handleZodError(err));

        // valiadtion error
    } else if (err?.name === 'ValidationError') {
        assignErrorDetails(handleValidationError(err));

        // cast error
    } else if (err?.name === 'CastError') {
        assignErrorDetails(handleCastError(err));

        // data dupication error
    } else if (err?.code === 11000) {
        assignErrorDetails(handleDuplicateError(err));

        // app error
    } else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err.message;
        errorMessage = err.errorMessage;
        errorDetails = null;
    } else if (err instanceof Error) {
        message = err.message;
        errorMessage = err?.message;
    }

    // returned response
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorMessage,
        errorDetails,
        stack: config.NODE_ENV === 'development' ? err?.stack : null
    });
};

export default globalErrorHandler;
