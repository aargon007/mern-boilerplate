import { createBrowserRouter } from 'react-router';
import DashboardLayout from '../layouts/DashboardLayout';
import RootLayout from '../layouts/RootLayout';
import DashboardPage from '../pages/DashboardPage';
import Home from '../pages/Homepage';
import ProtectedRoute from './ProtectedRoute';
import Documentation from '@/pages/Boilerplate/Documentation';
import ErrorPage from '@/components/shared/ErrorPage';

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/docs',
                element: <Documentation />
            }
        ]
    },
    // {
    //     path: "/signin",
    //     element: <Signin />
    // },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: '',
                element: <DashboardPage />
            }
        ]
    }
]);

export default Routes;
