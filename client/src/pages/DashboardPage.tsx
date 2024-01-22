import React from "react";
import useTop from "../hooks/useTop";

const DashboardPage: React.FC = () => {
    useTop();
    return (
        <div className="p-7">
            <h1 className="font-extrabold text-6xl text-center">
                Welcome to Dashboard
            </h1>
        </div>
    );
}

export default DashboardPage;