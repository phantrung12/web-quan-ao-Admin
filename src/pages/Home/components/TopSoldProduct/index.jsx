import { Table, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import axiosIntance from "../../../../helpers/axios";

const TopSoldProduct = () => {
  const [products, setProducts] = useState([]);
  const getTopSoldPro = useCallback(async () => {
    const res = await axiosIntance.get("/admin/product/topSold");
    setProducts(res.data);
  }, []);

  useEffect(() => {
    getTopSoldPro();
  }, []);

  const columns = [
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
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
      render: (value) => value && value[0]?.name,
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
    },
  ];

  return (
    <div>
      <Typography.Title level={3}>Sản phẩm bán chạy</Typography.Title>
      <Table
        columns={columns}
        dataSource={products || []}
        locale={{
          emptyText: "Không tìm thấy kết quả phù hợp",
        }}
        pagination={false}
      />
    </div>
  );
};

export default TopSoldProduct;
