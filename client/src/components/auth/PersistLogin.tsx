import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from "../../hooks/useRefreshToken";
import { useAuth } from "../../hooks/useAuth";
import { Loader } from "../common/Loader";

export const PersistLogin = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {}, [isLoading]);

  return <>{!persist ? <Outlet /> : isLoading ? <Loader /> : <Outlet />}</>;
};
