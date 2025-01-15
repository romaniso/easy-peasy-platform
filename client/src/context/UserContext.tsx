import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { User } from "../interfaces/user";
interface UserContextProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}
const UserContext = createContext<UserContextProps>({
  user: {},
  setUser: () => {},
});

interface UserProviderProps {
  children: ReactElement;
}

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    console.log("User context: ", user);
  }, [JSON.stringify(user)]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
