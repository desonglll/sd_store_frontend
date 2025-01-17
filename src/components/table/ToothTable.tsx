import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Api from "../../config/api.ts";
import {Button, notification, Table, TableColumnsType} from "antd";
import {TableRowSelection} from "antd/es/table/interface";
import {useNavigate} from "react-router";
import RouteApi from "../../config/route_api.ts";

interface ToothType {
    id: React.Key;
    tooth_id: string;
    name: string;
    brand: string;
    category: number;
    stock_quantity: number;
    sale_price: string;
    user: number;
    available: boolean;
    color: string;
    material: string;
    model: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    images: string[];
    created_at: string;
    updated_at: string;
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
    const navigate = useNavigate();

    const csrfToken = Cookies.get("csrf-token");
    const [rawData, setRawData] = useState<ToothResponseType>({
        count: 0,
        next: undefined,
        previous: undefined,
        limit: 10,
        offset: 0,
        results: undefined,
    });

    // 使用Set来存储所有已选择的记录ID，确保唯一性
    const [selectedRowKeys, setSelectedRowKeys] = useState<Set<React.Key>>(new Set());

    // 添加当前页的数据缓存
    const [currentPageData, setCurrentPageData] = useState<ToothType[]>([]);

    const fetchToothData = useCallback((limit: number, offset: number) => {
        return axios.get(Api.tooth, {
            withCredentials: true,
            headers: {"X-CSRFToken": csrfToken},
            params: {limit, offset},
        });
    }, [csrfToken]);
    useEffect(() => {
        fetchToothData(rawData.limit, rawData.offset).then((resp) => {
            if (resp.status === 200) {
                const newData = {
                    ...resp.data,
                    results: resp.data.results.map((item: ToothType) => ({
                        ...item,
                        key: item.id,
                    })),
                };
                setRawData(newData);
                setCurrentPageData(newData.results || []);
            }
        }).catch((error) => {
            if (error.status === 403) {
                notification.info({
                    message: error.response.data.detail,
                    description: <>Please login first. <Button type={"primary"} onClick={() => {
                        navigate(RouteApi.login)
                    }}>Login</Button></>
                })
            }
        })
        ;
    }, [fetchToothData, navigate, rawData.limit, rawData.offset]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        // 将数组转换为Set以保持选择状态
        const updatedSelection = new Set(selectedRowKeys);

        // 获取当前页面上所有记录的ID
        const currentPageIds = currentPageData.map(item => item.id);

        // 找出当前页面上新增的选择
        const newSelections = newSelectedRowKeys.filter(key => !selectedRowKeys.has(key));

        // 找出当前页面上取消的选择
        const removedSelections = Array.from(selectedRowKeys)
            .filter(key => currentPageIds.includes(key as React.Key))
            .filter(key => !newSelectedRowKeys.includes(key));

        // 更新选择状态
        newSelections.forEach(key => updatedSelection.add(key));
        removedSelections.forEach(key => updatedSelection.delete(key));

        // 更新状态
        setSelectedRowKeys(updatedSelection);
    };

    const rowSelection: TableRowSelection<ToothType> = {
        selectedRowKeys: Array.from(selectedRowKeys),
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: "odd",
                text: "Select Odd Row",
                onSelect: (changeableRowKeys) => {
                    const newSelection = new Set(selectedRowKeys);
                    changeableRowKeys.forEach((key, index) => {
                        if (index % 2 === 0) {
                            newSelection.add(key);
                        } else {
                            newSelection.delete(key);
                        }
                    });
                    setSelectedRowKeys(newSelection);
                },
            },
            {
                key: "even",
                text: "Select Even Row",
                onSelect: (changeableRowKeys) => {
                    const newSelection = new Set(selectedRowKeys);
                    changeableRowKeys.forEach((key, index) => {
                        if (index % 2 !== 0) {
                            newSelection.add(key);
                        } else {
                            newSelection.delete(key);
                        }
                    });
                    setSelectedRowKeys(newSelection);
                },
            },
        ],
    };

    const handlePaginationChange = (page: number, pageSize: number) => {
        const offset = (page - 1) * pageSize;
        fetchToothData(pageSize, offset).then((resp) => {
            if (resp.status === 200) {
                const newData = {
                    ...resp.data,
                    results: resp.data.results.map((item: ToothType) => ({
                        ...item,
                        key: item.id,
                    })),
                };
                setRawData(newData);
                setCurrentPageData(newData.results || []);
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