import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { Container } from 'react-bootstrap';
import { getAllImExport } from '../../redux/actions/imexport.actions';
import { Button, Divider, Space, Table, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';

const ImportExport = () => {
    const imexport = useSelector((state) => state.imexport.imexports);
    console.log(imexport);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllImExport());
    }, [dispatch]);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            //   render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tên sản phẩm',
            // dataIndex: 'productId.name',
            // key: 'productId.name',
            render: (value) => value && value.productId.name,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Nhập/Xuất',

            render: (value) => (value && value.type === 'import' ? 'Nhập hàng' : 'Xuất hàng'),
        },
        {
            title: 'Người nhập/xuất',
            render: (value) => value && value.createdBy.username,
        },
        {
            title: 'Ngày nhập/xuất',
            render: (value) => value && dayjs(value.createdAt).format('DD/MM/YYYY HH:mm:ss'),
        },
    ];

    return (
        <Layout sidebar>
            <Container className="py-3">
                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography.Title level={3}>Lịch sử nhập/xuất hàng</Typography.Title>
                </Space>
                <Divider />
                <Table
                    columns={columns}
                    dataSource={imexport || []}
                    locale={{
                        emptyText: 'Không tìm thấy kết quả phù hợp',
                    }}
                    pagination={false}
                    rowSelection={{
                        type: 'checkbox',
                    }}
                />
            </Container>
        </Layout>
    );
};

export default ImportExport;
