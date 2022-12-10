import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { Container } from 'react-bootstrap';
import { getAllImExport } from '../../redux/actions/imexport.actions';
import { Button, Divider, Space, Table, Tooltip, Typography } from 'antd';

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
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Người nhập/xuất',
            dataIndex: 'createdBy.username',
            key: 'createdBy.username',
        },
        {
            title: 'Ngày nhập/xuất',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
    ];

    // const columns = [
    //     { field: 'id', headerName: 'ID', width: 50 },
    //     {
    //         field: 'productId',
    //         headerName: 'Tên sản phẩm',
    //         width: 350,
    //         renderCell: (params) => {
    //             return params?.row?.productId.name;
    //         },
    //     },
    //     {
    //         field: 'quantity',
    //         headerName: 'Số lượng',
    //     },
    //     {
    //         field: 'type',
    //         headerName: 'Nhập/Xuất',
    //         width: 150,
    //         renderCell: (params) => {
    //             return params?.row?.type === 'import' ? 'Nhập hàng' : 'Xuất hàng';
    //         },
    //     },
    //     {
    //         field: 'createdBy',
    //         headerName: 'Người nhập/xuất',
    //         width: 150,
    //         renderCell: (params) => {
    //             return params?.row?.createdBy.username;
    //         },
    //     },
    //     {
    //         field: 'createdAt',
    //         headerName: 'Ngày nhập/xuất',
    //         width: 150,
    //         renderCell: (params) => {
    //             return dayjs(params?.row?.createdAt).format('DD/MM/YYYY HH:mm:ss');
    //         },
    //     },
    // ];

    // const renderDataGrid = () => {
    //     const ieList = imexport.imexports.map((item, index) => {
    //         return {
    //             id: index,
    //             ...item,
    //         };
    //     });
    //     return (
    //         <Box height="70vh">
    //             <DataGrid
    //                 columns={columns}
    //                 rows={ieList}
    //                 rowsPerPageOptions={[10]}
    //                 pageSize={10}
    //                 checkboxSelection
    //                 disableSelectionOnClick
    //                 components={{
    //                     Toolbar: GridToolbar,
    //                 }}
    //             />
    //         </Box>
    //     );
    // };

    // return (
    //     <Layout sidebar>
    //         <Typography variant="h5" marginY={2}>
    //             Lịch sử nhập xuất hàng
    //         </Typography>
    //         {renderDataGrid()}
    //     </Layout>
    // );

    return (
        <Layout sidebar>
            <Container className="py-3">
                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography.Title level={3}>Danh sách sản phẩm</Typography.Title>
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
            {/* {addModal && <ProductCreate open={addModal} onClose={() => setAddModal(false)} />} */}
        </Layout>
    );
};

export default ImportExport;
