import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../../types/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message
        };
    });

    // make plain error message
    const errorMessage: string =
        errorSources
            .map((error) => error.message.toLowerCase())
            .join('. ') + '.';
    const statusCode = 400;

    return {
        statusCode,
        message: 'Validation Error',
        errorMessage
    };
};

export default handleZodError;
