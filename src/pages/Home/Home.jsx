import { Card, Stack, CardContent, Typography } from "@mui/material";
import { Col, Row } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import Layout from "../../components/Layout";
import OrderAmountChart from "./components/OrderAmountChart";
import OrderStatusChart from "./components/OrderStatusChart";
import TopSoldProduct from "./components/TopSoldProduct";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Layout sidebar>
        <Row gutter={2} className="p-3">
          <Col span={12}>
            <OrderStatusChart />
          </Col>
          <Col span={12}>
            <OrderAmountChart />
          </Col>
          <Col span={12}>
            <TopSoldProduct />
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Home;
