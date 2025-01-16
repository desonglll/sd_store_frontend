import * as React from "react";
import {Button, Checkbox, Form, FormProps, Input} from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router";
import Api from "../../config/api.ts";
import RouteApi from "../../config/route_api.ts";


type FieldType = {
    username?: string,
    password?: string,
    remember?: string,
}


const LoginForm: React.FC = () => {
    const navigate = useNavigate()
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
            axios.post(Api.login, {
                    username: values.username,
                    password: values.password,
                }, {
                    withCredentials: true, // 允许发送和接收 cookies
                    headers: {
                        "X-CSRFToken": Cookies.get("csrftoken")
                    }
                }
            ).then((resp) => {
                if (resp.status === 200) {
                    console.log('Success:', resp.data);
                    navigate(RouteApi.index);
                }
            })
        }
    ;

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (<>
        <Form name={"basic"}
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              style={{maxWidth: 600}}
              initialValues={{remember: true}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </>)
}
export default LoginForm;