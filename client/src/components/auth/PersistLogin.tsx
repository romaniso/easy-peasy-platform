import {Outlet} from "react-router-dom";
import {useState, useEffect} from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import Logo from '../../assets/images/small-logo.png'

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth, persist} = useAuth();

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
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => {isMounted = false};
    }, []);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        // console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading]);

    return (
        <>
            {!persist
                ? <Outlet/>
                : isLoading // @TODO: add custom loader, maybe spinner
                ? <div className='w-screen h-screen bg-gradient-to-r from-[#F5F3FF] dark:from-[#202020] via-[#FAE8FF] dark:via-[#3b4058] to-[#C7D2FE] dark:to-[#202020] flex justify-center items-center'>
                        <img src={Logo} alt="" className='w-[100px] animate-bounce'/>
                    </div>
                : <Outlet/>
            }
        </>
    )
}

export default PersistLogin;
