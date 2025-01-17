import {Button, notification} from "antd";
import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import Api from "../../config/api.ts";
import {useNavigate} from "react-router";

const LogoutForm: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post(Api.logout, null, {
            headers: {
                "X-CSRFToken": Cookies.get("csrftoken")
            }
        }).then((resp) => {
            if (resp.status === 200) {
                console.log("Logout Successful: ", resp.data)
                notification.success({message: resp.data})
            }
        }).finally(() => {
            navigate("/")
            notification.success({message: "hello"})
        })

    }

    return (
        <>
            <Button onClick={handleLogout}>Logout</Button>
        </>
    )
}

export default LogoutForm