import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-[#f1f1f1]">
            <Outlet />
        </div>
    );
};

export default RootLayout;
