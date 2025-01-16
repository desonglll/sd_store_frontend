import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Flex, Layout, theme} from 'antd';
import {Route, Routes} from "react-router";
import SiderNavigation from "../components/navigation/SiderNavigation.tsx";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import Dashboard from "../components/dashboard/Dashboard.tsx";
import Tooth from "./bucket/tooth/tooth.tsx";
import AuthButton from "../components/auth/AuthButton.tsx";
import RouteApi from "../config/route_api.ts";

const {Header, Sider, Content} = Layout;

function Index() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    useEffect(() => {
        axios.get("http://localhost:8000/api/index").then((resp) => {
            console.log(resp.data);
        })
    }, []);
    return (
        <>
            <Flex style={{height: "100vh"}}>
                <Layout>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        <SiderNavigation/>
                    </Sider>
                    <Layout>
                        <Header style={{
                            padding: 0,
                            background: colorBgContainer,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />

                            <AuthButton/>
                        </Header>
                        <Content
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                                height: "100%",
                            }}
                        >
                            <Routes>
                                <Route path={RouteApi.index} element={<Dashboard/>}/>
                                <Route path={RouteApi.tooth} element={<Tooth/>}/>
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
            </Flex>
        </>
    )

}

export default Index;