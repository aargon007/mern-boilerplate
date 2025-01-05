import { createBrowserRouter } from 'react-router';
import DashboardLayout from '../layouts/DashboardLayout';
import RootLayout from '../layouts/RootLayout';
import DashboardPage from '../pages/DashboardPage';
import Home from '../pages/Homepage';
import ProtectedRoute from './ProtectedRoute';

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
        // errorElement: <LoadingPage />
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
