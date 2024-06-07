import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../layouts/Dashboard/DashboardLayout';
import RootLayout from '../layouts/Home/RootLayout';
import DashboardPage from '../pages/Dashbaord/DashboardPage';
import Home from '../pages/Home/Home';
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
