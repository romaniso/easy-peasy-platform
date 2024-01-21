import {useState, useEffect} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {User} from "../../interfaces/user";

const GET_USERS_URL = '/users'
const Users = () => {
    const [users, setUsers] = useState<[User]>();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(GET_USERS_URL,{
                    signal: controller.signal
                })
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, index) => <li key={index}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    )
}

export default Users;