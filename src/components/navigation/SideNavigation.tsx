import {Menu, MenuProps} from "antd";
import {HomeOutlined, OrderedListOutlined, PieChartOutlined, RocketOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import RouteApi from "../../config/route_api.ts";

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
    {
        key: RouteApi.index,
        icon: <HomeOutlined/>,
        label: "Index"
    },
    {
        key: RouteApi.analyze,
        icon: <PieChartOutlined/>,
        label: "Analyze"
    },
    {
        key: 'bucket',
        icon: <RocketOutlined/>,
        label: 'Bucket',
        children: [
            {
                label: "Tooth",
                key: RouteApi.tooth,
                icon: <RocketOutlined/>
            },
            {
                label: "Tooth Category",
                key: RouteApi.toothCategory,
                icon: <OrderedListOutlined/>
            }
        ]
    },
]

const SideNavigation: React.FC = () => {
    const [current, setCurrent] = useState(window.location.pathname);
    const navigate = useNavigate();
    const location = useLocation(); // 使用 useLocation 监听路径变化

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        navigate(e.key);
    };
    useEffect(() => {
        setCurrent(location.pathname);
    }, [location.pathname]);
    return (
        <>
            <div className="demo-logo-vertical"/>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[current]} // 使用 selectedKeys 动态更新选中项
                items={items}
                onClick={onClick}
            />
        </>
    )
}

export default SideNavigation;