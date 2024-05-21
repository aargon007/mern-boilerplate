import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createUserValidationSchema } from '../user/user.validation';
import { UserControllers } from '../user/user.controller';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.interface';

const router = express.Router();

// create user
router.post(
    '/register',
    validateRequest(createUserValidationSchema),
    UserControllers.createUser,
);

// login
router.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser,
);

// change password
router.post(
    '/change-password',
    auth(USER_ROLE.admin, USER_ROLE.user),
    validateRequest(AuthValidation.changePasswordValidationSchema),
    AuthControllers.changePassword,
);

export const UserRoutes = router;