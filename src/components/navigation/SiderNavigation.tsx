import {Menu, MenuProps} from "antd";
import {
    PieChartOutlined,
    HomeOutlined,
    RocketOutlined,
    OrderedListOutlined
} from '@ant-design/icons';
import React, {useState} from "react";
import {useNavigate} from "react-router";

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
    {
        key: 'index',
        icon: <HomeOutlined/>,
        label: "Index"
    },
    {
        key: 'analyze',
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
                key: "bucket/tooth",
                icon: <RocketOutlined/>
            },
            {
                label: "Tooth Category",
                key: "bucket/toothcategory",
                icon: <OrderedListOutlined/>
            }
        ]
    },
]

const SiderNavigation: React.FC = () => {
    const [current, setCurrent] = useState('mail');
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        navigate(`/${e.key}`);
    };
    return (
        <>
            <div className="demo-logo-vertical"/>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[current]}
                items={items}
                onClick={onClick}
            />
        </>
    )
}

export default SiderNavigation;