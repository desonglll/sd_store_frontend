import React, {useEffect, useState} from "react";
import {Button, Checkbox, Flex, GetProps, Input, Table, TableColumnsType} from "antd";
import {TableRowSelection} from "antd/es/table/interface";

import httpLink from "../../graphql/httplink/httplink.ts";
import {ApolloClient, InMemoryCache, useQuery} from "@apollo/client";
import {ToothType} from "../../types/bucket.ts";
import {GetTeeth} from "../../graphql/querys/GetTeeth.graphql";

type SearchProps = GetProps<typeof Input.Search>;

const {Search} = Input;

const columns: TableColumnsType<ToothType> = [
    {
        title: 'TOOTH ID',
        dataIndex: 'id',
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
        dataIndex: 'category_name',
    },
    {
        title: 'STOCK QUANTITY',
        dataIndex: 'stockQuantity',
    },
    {
        title: 'SALE PRICE',
        dataIndex: 'salePrice',
    },
    {
        title: 'USER',
        dataIndex: 'user_name',
    },
    {
        title: 'AVAILABLE',
        dataIndex: 'available',
        render: (available: boolean, item: ToothType) => (
            <Checkbox onChange={() => {
            }} checked={available} id={item.id.toString()}></Checkbox>
        ),
    },
];


const uri = httpLink();

const client = new ApolloClient({
    link: uri,
    cache: new InMemoryCache(),
})

const ToothTable: React.FC = () => {
    const [pagination, setPagination] = useState({
        current: 1, // 当前页
        pageSize: 10, // 每页大小
    });
    // 使用Set来存储所有已选择的记录ID，确保唯一性
    const [selectedRowKeys, setSelectedRowKeys] = useState<Set<React.Key>>(new Set());
    const [dataSource, setDataSource] = useState<ToothType[]>()
    const [searchValue, setSearchValue] = useState<string>(''); // 保存当前的搜索条件

    const {data, loading, error, refetch} = useQuery(GetTeeth, {
        client,
        variables: {
            limit: pagination.pageSize,
            offset: (pagination.current - 1) * pagination.pageSize,
            search: searchValue, // 传递搜索条件
        }
    })

    useEffect(() => {
        if (error) console.log('Error:', error);
        if (data) {
            setDataSource(data.allTeeth)
        }
    }, [loading, error, data]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        // 将数组转换为Set以保持选择状态
        const updatedSelection = new Set(selectedRowKeys);

        // 获取当前页面上所有记录的ID
        const currentPageIds = data.allTeeth.map((item: ToothType) => item.id);

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
        setPagination({current: page, pageSize});
        refetch({
            limit: pageSize,
            offset: (page - 1) * pageSize,
            search: searchValue, // 传递当前搜索条件
        }).finally(() => {
            console.log("Update Table Data!")
        });
    };
    const onSearch: SearchProps['onSearch'] = (value) => {
        console.log("search", value)
        setSearchValue(value); // 更新搜索条件
        refetch({
            limit: pagination.pageSize,
            offset: (pagination.current - 1) * pagination.pageSize,
            search: value, // 将搜索值传递给 GraphQL 查询
        }).then((resp) => {
            console.log("Table Data Updated!");
            console.log(resp.data)
        }).catch(err => {
            console.error("Error in refetching data:", err);
        });
    };

    return (
        <>
            <Flex style={{flexDirection: 'column'}}>
                <div style={{alignSelf: 'flex-end', marginBottom: 20}}>
                    <Button>Create</Button>
                    <Search
                        placeholder="input search text"
                        onSearch={onSearch}
                        style={{width: 200}}
                    />
                </div>
                <Table<ToothType>
                    rowSelection={rowSelection}
                    dataSource={dataSource?.map((item) => ({
                        ...item,
                        key: item.id,
                        category_name: item.category.name,
                        user_name: item.user.username
                    })) || []}
                    columns={columns}
                    style={{height: "100%"}}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: data?.count || 0, // 根据返回的总记录数调整
                        onChange: handlePaginationChange,
                    }}
                    loading={loading}
                />
            </Flex>
        </>
    );
};

export default ToothTable;