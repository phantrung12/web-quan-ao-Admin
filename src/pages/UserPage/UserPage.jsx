import { Button, Divider, Space, Table, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { getAllUser } from '../../redux/actions/user.actions';
// import ProductCreate from './product-create';

const UserList = () => {
    const [addModal, setAddModal] = useState(false);

    const users = useSelector((state) => state.user.userList);
    console.log(users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            //   render: (text) => <a>{text}</a>,
        },
        {
            title: 'Họ',
            dataIndex: 'lastName',
            key: 'lastName',
            //   render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tên',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (value, record) => {
                return (
                    <Space size="middle">
                        <Tooltip title="Xem">
                            <Button type="primary" icon={<EyeOutlined />}></Button>
                        </Tooltip>
                        <Tooltip title="Sửa">
                            <Button type="primary" icon={<EditOutlined />}></Button>
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <Button danger icon={<DeleteOutlined />}></Button>
                        </Tooltip>
                    </Space>
                );
            },
        },
    ];

    return (
        <Layout sidebar>
            <Container className="py-3">
                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography.Title level={3}>Danh sách tài khoản</Typography.Title>
                    <Space>
                        <Button
                            style={{ display: 'flex', alignItems: 'center' }}
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setAddModal(true)}
                        >
                            Thêm mới
                        </Button>
                    </Space>
                </Space>
                <Divider />
                <Table
                    columns={columns}
                    dataSource={users || []}
                    locale={{
                        emptyText: 'Không tìm thấy kết quả phù hợp',
                    }}
                    pagination={false}
                    rowSelection={{
                        type: 'checkbox',
                    }}
                />
            </Container>
            {/* {addModal && <ProductCreate open={addModal} onClose={() => setAddModal(false)} />} */}
        </Layout>
    );
};

export default UserList;
