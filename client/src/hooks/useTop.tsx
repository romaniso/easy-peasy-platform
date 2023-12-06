import { useEffect } from "react";

function useTop(): void {
    useEffect(():void => {
        window.scrollTo(0, 0);
    }, []);
}

export default useTop;
