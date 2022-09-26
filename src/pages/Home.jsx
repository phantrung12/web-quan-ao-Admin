import { Card, Stack, CardContent, Typography } from "@mui/material";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Layout from "../components/Layout";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Layout sidebar></Layout>
    </div>
  );
};

export default Home;
