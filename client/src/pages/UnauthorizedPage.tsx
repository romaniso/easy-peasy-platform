import React from "react";
import useTop from "../hooks/useTop";

const UnauthorizedPage: React.FC = () =>{
    useTop();
    return (
        <div className="min-h-screen flex justify-center items-center">
            You are not authorized!
        </div>
    );
}

export default UnauthorizedPage;