import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="bg-gray-800 min-h-screen w-full overflow-hidden p-4 sm:p-6 md:p-7">
            <div className="py-10 lg:py-20 mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg">
                <Logo />
                <div className="mt-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;