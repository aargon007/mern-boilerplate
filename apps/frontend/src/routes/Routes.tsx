import ErrorPage from '@/components/shared/ErrorPage';
import DashboardLayout from '@/layouts/DashboardLayout';
import RootLayout from '@/layouts/RootLayout';
import DashboardPage from '@/pages/DashboardPage';
import Homepage from '@/pages/Homepage';
import { createBrowserRouter } from 'react-router';
import ProtectedRoute from './ProtectedRoute';

// data mode : https://reactrouter.com/start/data/installation
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
                lazy: async () => ({
                    Component: (
                        await import('@/pages/Boilerplate/Documentation')
                    ).default
                })
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
