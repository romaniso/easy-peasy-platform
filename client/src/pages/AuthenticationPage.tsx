import React, { useState } from "react";
import useTop from "../hooks/useTop";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const AuthenticationPage: React.FC = () => {
    useTop();
    const [toggle, setToggle] = useState(true);

    const handleToggle = () => {
        setToggle(!toggle);
    };
    return (
        <section className="min-h-screen flex items-center justify-center">
            {toggle ? (
                <Login onToggleForm={handleToggle} />
            ) : (
                <Register onToggleForm={handleToggle} />
            )}
        </section>
    );
}

export default AuthenticationPage;