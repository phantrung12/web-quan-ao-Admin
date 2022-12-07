import { Button, Divider, Space, Table, Tooltip, Typography } from "antd";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ProductCreate from "./product-create";

const ProductsList = () => {
  const [addModal, setAddModal] = useState(false);

  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      //   render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      //   render: (text) => <a>{text}</a>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
      render: (value) => value && value[0]?.name,
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
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
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Typography.Title level={3}>Danh sách sản phẩm</Typography.Title>
          <Space>
            <Button
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
          dataSource={product.products || []}
          locale={{
            emptyText: "Không tìm thấy kết quả phù hợp",
          }}
          pagination={false}
          rowSelection={{
            type: "checkbox",
          }}
        />
      </Container>
      {addModal && (
        <ProductCreate open={addModal} onClose={() => setAddModal(false)} />
      )}
    </Layout>
  );
};

export default ProductsList;
