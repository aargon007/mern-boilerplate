import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <div className="bg-[#181818] text-[#f1f1f1] min-h-screen">
            <Outlet />
        </div>
    );
};

export default RootLayout;