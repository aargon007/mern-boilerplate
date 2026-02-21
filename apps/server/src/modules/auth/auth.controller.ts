import httpStatus from 'http-status';
import catchAsync from './../../shared/catchAsync';
import sendResponse from './../../shared/sendResponse';
import { AuthServices } from './auth.service';

// login user
const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User login successful',
        data: result
    });
});

// change password
const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;

    const result = await AuthServices.changePassword(req.user, passwordData);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Password changed successfully',
        data: result
    });
});

export const AuthControllers = {
    loginUser,
    changePassword
};
