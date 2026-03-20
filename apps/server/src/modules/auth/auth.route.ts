import express from 'express';
import validateRequest from '@/middlewares/validateRequest';
import { createUserValidationSchema } from '@/modules/user/user.validation';
import { UserControllers } from '@/modules/user/user.controller';
import { AuthValidation } from '@/modules/auth/auth.validation';
import { AuthControllers } from '@/modules/auth/auth.controller';
import { USER_ROLE } from '@/modules/user/user.interface';
import auth from '@/middlewares/auth';

const router = express.Router();

// create user
router.post(
    '/register',
    validateRequest(createUserValidationSchema),
    UserControllers.createUser
);

// login
router.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser
);

// change password
router.post(
    '/change-password',
    auth(USER_ROLE.admin, USER_ROLE.user),
    validateRequest(AuthValidation.changePasswordValidationSchema),
    AuthControllers.changePassword
);

export const UserRoutes = router;
