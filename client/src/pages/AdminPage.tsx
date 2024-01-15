import React from "react";
import useTop from "../hooks/useTop";
import Users from "../components/auth/Users";

const AdminPage: React.FC = () =>{
    useTop();
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1>
                Hello Admin!
            </h1>
            <Users/>
        </div>
    );
}

export default AdminPage;