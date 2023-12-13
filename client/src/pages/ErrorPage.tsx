import React from "react";
import useTop from "../hooks/useTop";

const ErrorPage: React.FC = () =>{
    useTop();
    return (
        <div className="min-h-screen flex justify-center items-center">
            ErrorPage
        </div>
    );
}

export default ErrorPage;