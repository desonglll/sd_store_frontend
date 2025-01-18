import ToothTable from "../../components/bucket/ToothTable.tsx";
import React, {useEffect, useState} from "react";
import {Breadcrumb, Flex,} from "antd";
import {Link, Route, Routes, useLocation, useNavigate} from "react-router";
import RouteApi from "../../config/route_api.ts";
import ToothCategoryTable from "../../components/bucket/ToothCategoryTable.tsx";
import ToothCreate from "../../components/bucket/ToothCreate.tsx";

const Bucket: React.FC = () => {
    const location = useLocation()
    const [breadCrumb, setBreadCrumb] = useState<{ title: React.JSX.Element }[]>([])
    const navigate = useNavigate();
    useEffect(() => {
        const pathSegments = location.pathname.split("/").filter((segment) => segment); // 过滤空段
        let cumulativePath = ""; // 累积路径

        const breads = pathSegments.map((segment) => {
            cumulativePath += `/${segment}`; // 构建完整路径
            console.log(cumulativePath)
            return {
                title: <Link to={cumulativePath}>{segment}</Link>,
            };
        });

        breads.unshift({
            title: <a onClick={() => {
                navigate(RouteApi.index)
            }}>Home</a>,
        });

        console.log(breads)
        setBreadCrumb(breads);
    }, [location.pathname, navigate]);

    return (
        <>
            <Flex style={{height: '100%', overflow: "scroll", flexDirection: "column"}}>
                <div style={{marginBottom: '20px'}}>
                    <h2>TOOOOOTH</h2>
                    <Breadcrumb items={breadCrumb}/>
                </div>
                <Routes>
                    <Route path={""} element={<div>bucket page</div>}/>
                    <Route path={RouteApi.tooth} element={<ToothTable/>}/>
                    <Route path={RouteApi.toothCreate} element={<ToothCreate/>}/>
                    <Route path={RouteApi.toothCategory} element={<ToothCategoryTable/>}/>
                </Routes>
            </Flex>
        </>
    )
}

export default Bucket