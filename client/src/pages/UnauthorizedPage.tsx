import React from "react";
import useTop from "../hooks/useTop";
import {useNavigate} from "react-router-dom";
import Button from "../components/common/Button";

const UnauthorizedPage: React.FC = () =>{
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    useTop();
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className='text-orange-500 text-3xl drop-shadow mb-10'>You are not authorized!</h1>
            <Button primary rounded onClick={goBack}>Go Back</Button>
        </div>
    );
}

export default UnauthorizedPage;