import React from "react";
import useTop from "../hooks/useTop";
import Sidebar from "../components/Sidebar";

const DashboardPage: React.FC = () => {
    useTop();
    return (
        <div className="flex">
            <Sidebar />
            <div className="p-7">
                <h1 className="font-extrabold text-6xl text-center">
                    Welcome to Dashboard
                </h1>
            </div>
        </div>
    );
}

export default DashboardPage;