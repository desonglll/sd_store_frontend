import React, {useEffect, useState} from "react";
import {Button, notification} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Api from "../../config/api.ts";
import {useNavigate} from "react-router";
import RouteApi from "../../config/route_api.ts";

const AuthButton: React.FC = () => {
    const [status, setStatus] = useState("Login")
    const [isLogged, setIsLogged] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    const handleClick = () => {
        if (isLogged) {
            axios.post(Api.logout, null, {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": Cookies.get("csrftoken")
                }
            }).then((resp) => {
                if (resp.status === 200) {
                    notification.success({message: resp.data})
                    navigate(RouteApi.login)
                }
            }).finally(() => {
                setIsLogged(false)
                setStatus("Login")
            })
        } else {
            navigate(RouteApi.login)
        }
    }

    useEffect(() => {
        axios.get(Api.loginCheck, {
            withCredentials: true,
            headers: {
                "X-CSRFToken": Cookies.get("csrftoken")
            }
        }).then((resp) => {
            if (resp.status === 200) {
                setIsLogged(resp.data["is_logged"]);
                if (resp.data["is_logged"]) {
                    setStatus("Logout")
                } else {
                    setStatus("Login")
                }
            }
        }).finally(() => {
            setLoading(false)
        })
    }, []);

    return (
        !loading &&
        <>
            <Button style={{
                marginRight: 10
            }} onClick={handleClick}>
                {status}
            </Button>
        </>
    )
}
export default AuthButton;