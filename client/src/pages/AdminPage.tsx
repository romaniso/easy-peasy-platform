import { useTop } from "../hooks/useTop";
import { Users } from "../components/auth/Users";
import { Button } from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, logoutUser } from "../store/store";

export const AdminPage = (): JSX.Element => {
  useTop();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const signOut = async () => {
    dispatch(logoutUser());
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
