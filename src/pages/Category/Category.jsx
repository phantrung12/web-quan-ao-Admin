import React, { useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import Layout from '../../components/Layout';
import CategoryCreate from './Category-create';
import { Container } from 'react-bootstrap';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Space, Table, Tooltip, Typography } from 'antd';
import { getAllCategory } from '../../redux/actions/category.actions';
import { useDispatch, useSelector } from 'react-redux';
import CategoryDelete from './Category-delete';
import CategoryUpdate from './Category-update';

const CategoryList = () => {
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const category = useSelector((state) => state.category);
    const dispatch = useDispatch();

    const formatCategory = (category) => {
        return category.map((item) => ({
            title: item?.name,
            value: item?._id,
            children: item?.children ? formatCategory(item?.children) : [],
        }));
    };
    const cateData = formatCategory(category.categories);
    console.log(cateData, 'cate');
    useEffect(() => {
        dispatch(getAllCategory());
    }, [1]);

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    return (
        <Layout sidebar>
            <Container className="py-3">
                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography.Title level={3}>Danh mục sản phẩm</Typography.Title>
                    <Space>
                        <Button
                            style={{ display: 'flex', alignItems: 'center' }}
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setAddModal(true)}
                        >
                            Thêm mới
                        </Button>
                        <Button
                            style={{ display: 'flex', alignItems: 'center' }}
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => setUpdateModal(true)}
                        >
                            Sửa
                        </Button>
                        <Button
                            style={{ display: 'flex', alignItems: 'center' }}
                            type="primary"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => setDeleteModal(true)}
                        >
                            Xóa
                        </Button>
                    </Space>
                </Space>
                <Divider />
                <Tree
                    showLine
                    switcherIcon={<DownOutlined />}
                    defaultExpandedKeys={['0-0-0']}
                    onSelect={onSelect}
                    treeData={formatCategory(category.categories)}
                />
            </Container>
            {addModal && <CategoryCreate cateData={cateData} open={addModal} onClose={() => setAddModal(false)} />}
            {updateModal && (
                <CategoryUpdate cateData={cateData} open={updateModal} onClose={() => setUpdateModal(false)} />
            )}
            {deleteModal && (
                <CategoryDelete cateData={cateData} openModal={deleteModal} onClose={() => setDeleteModal(false)} />
            )}
        </Layout>
    );
};

export default CategoryList;
