import { Column } from "@ant-design/plots";
import { Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import axiosIntance from "../../../../helpers/axios";

const OrderAmountChart = () => {
  const [dataChart, setDataChart] = useState([]);

  const getDataChart = useCallback(async () => {
    const res = await axiosIntance.post("/order/countIncome");
    setDataChart(
      res.data.countIncome.map((item) => ({
        type: `${item.x.month}-${item.x.year}`,
        value: item.y,
      }))
    );
  }, []);

  useEffect(() => {
    getDataChart();
  }, []);
  console.log(dataChart);

  const config = {
    data: dataChart,
    xField: "type",
    yField: "value",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Tháng",
      },
      value: {
        alias: "Tổng doanh thu",
      },
    },
  };

  return (
    <div>
      <Typography.Title level={3}>Thống kê tổng số đơn hàng</Typography.Title>
      <Column {...config} />
    </div>
  );
};

export default OrderAmountChart;
