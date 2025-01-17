import ToothTable from "../../../components/table/ToothTable.tsx";
import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {useLocation, useNavigate} from "react-router";
import RouteApi from "../../../config/route_api.ts";

const Tooth: React.FC = () => {
    const location = useLocation()
    const [breadCrumb, setBreadCrumb] = useState<{ title: React.JSX.Element }[]>([])
    const navigate = useNavigate();
    useEffect(() => {
        const pathSegments = location.pathname.split("/").filter((segment) => segment); // 过滤空段
        let cumulativePath = ""; // 累积路径

        const breads = pathSegments.map((segment) => {
            cumulativePath += `/${segment}`; // 构建完整路径
            return {
                title: <a onClick={() => {
                    navigate(cumulativePath)
                }}>{segment}</a>, // 使用完整路径作为链接
            };
        });

        // 添加根路径的面包屑项
        breads.unshift({
            title: <a onClick={() => {
                navigate(RouteApi.index)
            }}>Home</a>,
        });

        console.log(breads); // 调试用
        setBreadCrumb(breads);
    }, [location.pathname, navigate]); // location.pathname 变化时重新生成面包屑

    return (
        <>
            <div style={{height: '100%', overflow: "scroll"}}>
                <Breadcrumb
                    items={breadCrumb}
                />
                <ToothTable/>
            </div>
        </>
    )
}

export default Tooth