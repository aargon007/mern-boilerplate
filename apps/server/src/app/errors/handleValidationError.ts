import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../../types/error';

const handleValidationError = (
    err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
    // manage error
    const errorSources: TErrorSources = Object.values(err.errors).map(
        (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: val?.path,
                message: val?.message
            };
        }
    );

    // make plain errror message
    const errorMessage: string =
        errorSources
            .map((error) => `${error.path} is ${error.message.toLowerCase()}`)
            .join('. ') + '.';

    const statusCode = 400;

    return {
        statusCode,
        message: 'Validation Error',
        errorMessage: errorMessage
    };
};

export default handleValidationError;
