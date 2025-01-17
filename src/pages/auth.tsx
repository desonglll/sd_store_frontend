import LoginForm from "../components/auth/LoginForm.tsx";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {Flex} from "antd";

function Auth() {
    useEffect(() => {
        console.log(Cookies.get("csrftoken"));
    }, []);
    return (
        <>
            <Flex style={{alignItems: "center", justifyContent: "center", flexDirection: "column", height: "100%"}}>
                <h1>SD Administration</h1>
                <LoginForm/>
            </Flex>
        </>
    )
}

export default Auth;