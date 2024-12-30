import React from "react";
import useTop from "../hooks/useTop";
import { Users } from "../components/auth/Users";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const AdminPage: React.FC = () => {
  useTop();
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/");
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1>Hello Admin!</h1>
      <Users />
      <Button secondary outline rounded onClick={signOut}>
        Sign out
      </Button>
    </div>
  );
};

export default AdminPage;
