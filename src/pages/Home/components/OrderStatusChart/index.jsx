import { Pie } from "@ant-design/plots";
import { Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import axiosIntance from "../../../../helpers/axios";

const OrderStatusChart = () => {
  const [dataChart, setDataChart] = useState([]);

  const getDataChart = useCallback(async () => {
    const res = await axiosIntance.get("/order/countPayment");
    setDataChart(
      res.data.countPayment.map((item) => ({
        type: item.label === "pending" ? "Chờ thanh toán" : "Đã thanh toán",
        value: item.value,
      }))
    );
  }, []);

  useEffect(() => {
    getDataChart();
  }, []);

  const config = {
    appendPadding: 10,
    data: dataChart,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <div>
      <Typography.Title level={3}>
        Thống kê thanh toán thanh toán
      </Typography.Title>
      {dataChart.length > 0 ? <Pie {...config} /> : <p>Loading.....</p>}
    </div>
  );
};

export default OrderStatusChart;
