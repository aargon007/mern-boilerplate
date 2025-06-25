import { createBrowserRouter } from 'react-router';
import ErrorPage from '@/components/shared/ErrorPage';
import DashboardLayout from '@/layouts/DashboardLayout';
import RootLayout from '@/layouts/RootLayout';
import ProtectedRoute from './ProtectedRoute';
import Homepage from '@/pages/Homepage';
import DashboardPage from '@/pages/DashboardPage';
import Documentation from '@/pages/Boilerplate/Documentation';

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Homepage />
            },
            {
                path: '/docs',
                element: <Documentation />
            }
        ]
    },
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
