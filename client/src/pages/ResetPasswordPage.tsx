import { useParams } from "react-router-dom";
import { useTop } from "../hooks/useTop";
import { Reset } from "../components/auth/Reset";
import { ChangePass } from "../components/auth/ChangePass";

export const ResetPasswordPage = (): JSX.Element => {
  const { token } = useParams();
  useTop();

  return (
    <section className="min-h-screen flex items-center justify-center">
      {token ? <ChangePass token={token} /> : <Reset />}
    </section>
  );
};
