import { useState, useEffect } from "react";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { Auth } from "../../interfaces/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AxiosError } from "axios";

const GET_USERS_URL = "/users";
export const Users = (): JSX.Element => {
  const [users, setUsers] = useState<[Auth]>();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(GET_USERS_URL, {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {
        const errType = (err as AxiosError).name;
        if (errType === "CanceledError") {
          console.log("Request canceled:", err);
        } else {
          console.error(err);
          navigate("/auth", { state: { from: location }, replace: true });
        }
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      <Link to="/">Home</Link>
    </article>
  );
};
