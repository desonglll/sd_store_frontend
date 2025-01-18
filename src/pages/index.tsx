import React, {useEffect, useMemo, useState} from "react";
import {Button, Flex, Layout, notification, theme} from 'antd';
import {Route, Routes} from "react-router";
import SideNavigation from "../components/navigation/SideNavigation.tsx";
import {MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';
import Dashboard from "../components/dashboard/Dashboard.tsx";
import Bucket from "./bucket/bucket.tsx";
import AuthButton from "../components/auth/AuthButton.tsx";
import RouteApi from "../config/route_api.ts";

const {Header, Sider, Content} = Layout;

function Index() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const Context = React.createContext({name: 'Default'});

    const [, contextHolder] = notification.useNotification();

    const contextValue = useMemo(() => ({name: 'Ant Design'}), []);


    useEffect(() => {
    }, []);
    return (
        <>

            <Flex style={{height: "100vh"}}>
                <Layout>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        <SideNavigation/>
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
                        <Context.Provider value={contextValue}>
                            {contextHolder}
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
                                    <Route path={RouteApi.bucket + '/*'} element={<Bucket/>}/>
                                </Routes>
                            </Content>
                        </Context.Provider>
                    </Layout>
                </Layout>
            </Flex>
        </>
    )

}

export default Index;