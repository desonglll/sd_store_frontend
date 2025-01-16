import LoginForm from "../components/auth/LoginForm.tsx";
import {useEffect} from "react";
import Cookies from "js-cookie";

function Auth() {
    useEffect(() => {
        console.log(Cookies.get("csrftoken"));
    }, []);
    return (
        <>
            Please fill the following form to login.
            <LoginForm/>
        </>
    )
}

export default Auth;