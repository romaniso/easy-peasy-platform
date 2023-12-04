import {createContext, useState} from "react";

const UserContext = createContext();

function Provider ({children}){
    const [isNewUser, setIsNewUser] = useState(false);
    const handleUser = () => {
      setIsNewUser(true);
    };
    const useContext = {
        isNewUser,
        handleUser,
    };

  return <UserContext.Provider value={useContext}>
      {children}
  </UserContext.Provider>
};

export {Provider};
export default UserContext;
