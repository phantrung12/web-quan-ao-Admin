import { Col, Grid, Row } from "antd";
import React from "react";

const FormItem = ({ title, children, required, error, errorText }) => {
  return (
    <Row className="mb-2">
      <Col span={24} className="mb-1">
        {title}
      </Col>
      <Col span={24}>{children}</Col>
      {error && <Col span={24}>{errorText}</Col>}
    </Row>
  );
};

export default FormItem;
