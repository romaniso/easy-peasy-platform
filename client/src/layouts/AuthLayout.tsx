import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AuthLayout: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-[#F5F3FF] dark:from-[#202020] via-[#FAE8FF] dark:via-[#3b4058] to-[#C7D2FE] dark:to-[#202020] flex h-screen">
            <Sidebar />
            <main className="flex-1 relative z-0">
                <Outlet />
            </main>
        </div>
    );
};

export default AuthLayout;
