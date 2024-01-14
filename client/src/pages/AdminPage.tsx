import React from "react";
import useTop from "../hooks/useTop";

const AdminPage: React.FC = () =>{
    useTop();
    return (
        <div className="min-h-screen flex justify-center items-center">
            Hello Admin!
        </div>
    );
}

export default AdminPage;