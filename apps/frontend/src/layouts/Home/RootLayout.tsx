import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div className="min-h-screen bg-[#181818] text-[#f1f1f1]">
            <Outlet />
        </div>
    );
};

export default RootLayout;
