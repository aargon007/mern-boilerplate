import { Router } from 'express';
import { UserRoutes } from '../modules/auth/auth.route';
// import modules route

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
