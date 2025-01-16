import React, {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Api from "../../../config/api.ts";
import {Table, TableColumnsType} from "antd";
import {TableRowSelection} from "antd/es/table/interface";

interface ToothType {
    id: React.Key; // React 列表项的唯一标识
    tooth_id: string; // 牙齿的唯一标识符
    name: string; // 牙齿名称
    brand: string; // 品牌
    category: number; // 类别 ID
    stock_quantity: number; // 库存数量
    sale_price: string; // 销售价格（字符串格式）
    user: number; // 用户 ID
    available: boolean; // 是否可用
    color: string; // 颜色
    material: string; // 材质
    model: string; // 型号
    length: number; // 长度
    width: number; // 宽度
    height: number; // 高度
    weight: number; // 重量
    images: string[]; // 图片数组
    created_at: string; // 创建时间
    updated_at: string; // 更新时间
}


const columns: TableColumnsType<ToothType> = [
    {
        title: 'TOOTH ID',
        dataIndex: 'tooth_id',
    },
    {
        title: 'TOOTH NAME',
        dataIndex: 'name',
    },
    {
        title: 'BRAND',
        dataIndex: 'brand',
    },
    {
        title: 'CATEGORY',
        dataIndex: 'category',
    },
    {
        title: 'STOCK QUANTITY',
        dataIndex: 'stock_quantity',
    },
    {
        title: 'SALE PRICE',
        dataIndex: 'sale_price',
    },
    {
        title: 'USER',
        dataIndex: 'user',
    },
    {
        title: 'AVAILABLE',
        dataIndex: 'available',
    },
];

interface ToothResponseType {
    count: number;
    next?: string;
    previous?: string;
    limit: number;
    offset: number;
    results?: [ToothType]
}

const ToothTable: React.FC = () => {
    const csrfToken = Cookies.get("csrf-token");
    const [rawData, setRawData] = useState<ToothResponseType>({
        count: 0,
        next: undefined,
        previous: undefined,
        limit: 10,
        offset: 0,
        results: undefined,
    });

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // 全局存储选中行的 key

    const fetchToothData = (limit: number, offset: number) => {
        return axios.get(Api.tooth, {
            withCredentials: true,
            headers: {"X-CSRFToken": csrfToken},
            params: {limit, offset},
        });
    };

    useEffect(() => {
        fetchToothData(rawData.limit, rawData.offset).then((resp) => {
            if (resp.status === 200) {
                setRawData({
                    ...resp.data,
                    results: resp.data.results.map((item: ToothType) => ({
                        ...item,
                        key: item.id,
                    })),
                });
            }
        });
    }, []);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {

        console.log(selectedRowKeys.concat(newSelectedRowKeys));
        setSelectedRowKeys(selectedRowKeys.concat(newSelectedRowKeys)); // 更新全局选中状态
    };

    const rowSelection: TableRowSelection<ToothType> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: "odd",
                text: "Select Odd Row",
                onSelect: (changeableRowKeys) => {
                    setSelectedRowKeys(changeableRowKeys.filter((_, index) => index % 2 === 0));
                },
            },
            {
                key: "even",
                text: "Select Even Row",
                onSelect: (changeableRowKeys) => {
                    setSelectedRowKeys(changeableRowKeys.filter((_, index) => index % 2 !== 0));
                },
            },
        ],
    };

    const handlePaginationChange = (page: number, pageSize: number) => {
        const offset = (page - 1) * pageSize;
        fetchToothData(pageSize, offset).then((resp) => {
            if (resp.status === 200) {
                setRawData({
                    ...resp.data,
                    results: resp.data.results.map((item: ToothType) => ({
                        ...item,
                        key: item.id,
                    })),
                });
            }
        });
    };

    return (
        <>
            <Table<ToothType>
                rowSelection={rowSelection}
                columns={columns}
                dataSource={rawData.results?.map((item) => ({...item, key: item.id})) || []}
                style={{height: "100%"}}
                pagination={{
                    total: rawData.count,
                    current: rawData.offset / rawData.limit + 1,
                    pageSize: rawData.limit,
                    onChange: (page, pageSize) => handlePaginationChange(page, pageSize),
                }}
            />
        </>
    );
};

export default ToothTable;
