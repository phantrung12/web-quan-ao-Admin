import { Button, Col, Divider, Input, Pagination, Row, Space, Table, Tooltip, TreeSelect, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
    VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import ProductCreate from './product-create';
import { Controller, useForm } from 'react-hook-form';
import { searchProduct } from '../../redux/actions/product.actions';
import { get } from 'lodash';
import ProductUpdate from './product-update';
import ProductDelete from './product-delete';
import ProductImexport from './product-imexport';
import ProductDetail from './product-detail';

const ProductsList = () => {
    const { handleSubmit, watch, control, reset } = useForm();
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [imexportModal, setImexportModal] = useState(false);
    const [pageSize, setPageSize] = useState(1);
    const [deleteModal, setDeleteModal] = useState(false);
    const [filter, setFilter] = useState({ page: 1 });
    const [idProduct, setIdProduct] = useState(null);
    const [idDel, setIdDel] = useState(null);
    console.log(idProduct);

    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);
    const productsPageable = useSelector((state) => state.product.productsPageable);
    const dispatch = useDispatch();

    const submit = (data) => {
        setFilter({ ...data, page: 1 });
    };
    console.log(filter, 'f');

    useEffect(() => {
        dispatch(searchProduct(filter));
    }, [filter, deleteModal]);

    useEffect(() => {
        setPageSize(productsPageable?.resultPerPage);
    }, [1]);
    const formatCategory = (category) => {
        return category.map((item) => ({
            title: item?.name,
            value: item?._id,
            children: item?.children ? formatCategory(item?.children) : [],
        }));
    };

    const handleReset = () => {
        reset();
        setFilter({ page: 1 });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            //   render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            //   render: (text) => <a>{text}</a>,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        // {
        //   title: "Thể loại",
        //   dataIndex: "category",
        //   key: "category",
        //   render: (value) => value && value[0]?.name,
        // },
        {
            title: 'Đã bán',
            dataIndex: 'sold',
            key: 'sold',
            // render: (value) => value && value[0]?.name,
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (value, record) => {
                return (
                    <Space size="middle">
                        <Tooltip title="Xem">
                            <Button
                                type="primary"
                                icon={<EyeOutlined />}
                                onClick={() => {
                                    setIdProduct(record._id);
                                    setDetailModal(true);
                                }}
                            ></Button>
                        </Tooltip>
                        <Tooltip title="Sửa">
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => {
                                    setIdProduct(record._id);
                                    setUpdateModal(true);
                                }}
                            ></Button>
                        </Tooltip>
                        <Tooltip title="Nhập/Xuất">
                            <Button
                                type="primary"
                                icon={<VerticalAlignMiddleOutlined />}
                                onClick={() => {
                                    setIdProduct(record._id);
                                    setImexportModal(true);
                                }}
                            ></Button>
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                    setIdDel(record._id);
                                    setDeleteModal(true);
                                }}
                            ></Button>
                        </Tooltip>
                    </Space>
                );
            },
        },
    ];

    return (
        <Layout sidebar>
            <Container className="py-3">
                <Typography.Title level={3}>Tìm kiếm</Typography.Title>
                <form onSubmit={handleSubmit(submit)}>
                    <Row gutter={3} className="mb-3">
                        <Col span={12}>
                            <Controller
                                name="keyword"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        placeholder="Nhập tên sản phẩm"
                                        maxLength={255}
                                        {...field}
                                        value={field.value}
                                    />
                                )}
                            />
                        </Col>
                        <Col span={6}>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TreeSelect
                                        {...field}
                                        showSearch
                                        style={{
                                            width: '100%',
                                        }}
                                        allowClear
                                        value={field.value || null}
                                        treeData={formatCategory(category.categories)}
                                        placeholder="Chọn thể loại"
                                    />
                                )}
                            />
                        </Col>
                        <Col span={6}>
                            <Space size={2} className="justify-content-center">
                                <Button htmlType="submit" type="primary">
                                    Tìm kiếm
                                </Button>
                                <Button onClick={() => handleReset()}>Clear</Button>
                            </Space>
                        </Col>
                    </Row>
                </form>
                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography.Title level={3}>Danh sách sản phẩm</Typography.Title>
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
                    dataSource={productsPageable.productList || []}
                    locale={{
                        emptyText: 'Không tìm thấy kết quả phù hợp',
                    }}
                    pagination={false}
                    rowSelection={{
                        type: 'checkbox',
                    }}
                />
                <Pagination
                    className="mt-4"
                    total={productsPageable?.filteredProductsCount}
                    pageSize={pageSize}
                    onChange={(e) => setFilter((pre) => ({ ...pre, page: e }))}
                    current={filter?.page}
                />
            </Container>
            {addModal && (
                <ProductCreate
                    open={addModal}
                    onClose={() => {
                        setAddModal(false);
                        setFilter({ page: 0 });
                    }}
                />
            )}
            {detailModal && (
                <ProductDetail
                    id={idProduct}
                    open={idProduct}
                    onClose={() => {
                        setDetailModal(false);
                        setFilter({ page: 0 });
                    }}
                />
            )}
            {updateModal && (
                <ProductUpdate
                    id={idProduct}
                    open={idProduct}
                    onClose={() => {
                        setUpdateModal(false);
                        setFilter({ page: 0 });
                    }}
                />
            )}
            {imexportModal && (
                <ProductImexport
                    id={idProduct}
                    open={idProduct}
                    onClose={() => {
                        setImexportModal(false);
                        setFilter({ page: 0 });
                    }}
                />
            )}
            {deleteModal && (
                <ProductDelete
                    id={idDel}
                    open={deleteModal}
                    onClose={() => {
                        setDeleteModal(false);
                    }}
                />
            )}
        </Layout>
    );
};

export default ProductsList;
