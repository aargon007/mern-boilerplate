import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
    // Extract value within double quotes using regex
    const match = err.message.match(/"([^"]*)"/);

    // The extracted value will be in the first capturing group
    const extractedMessage = match && match[1];

    const errorSources: TErrorSources = [
        {
            path: Object.keys(err.keyValue)[0],
            message: `already exists`
        }
    ];
    // make plan error message
    const errorMessage: string =
        errorSources
            .map((error) => `${error.path} is ${error.message.toLowerCase()}`)
            .join('. ') + '.';

    const statusCode = 400;

    return {
        statusCode,
        message: 'Invalid ID',
        errorMessage
    };
};

export default handleDuplicateError;
