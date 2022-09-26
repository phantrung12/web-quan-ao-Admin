import { Box } from "@material-ui/core";
import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { getAllImExport } from "../../redux/actions/imexport.actions";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import dayjs from "dayjs";

const ImportExport = () => {
  const imexport = useSelector((state) => state.imexport);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllImExport());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "productId",
      headerName: "Tên sản phẩm",
      width: 350,
      renderCell: (params) => {
        return params?.row?.productId.name;
      },
    },
    {
      field: "quantity",
      headerName: "Số lượng",
    },
    {
      field: "type",
      headerName: "Nhập/Xuất",
      width: 150,
      renderCell: (params) => {
        return params?.row?.type === "import" ? "Nhập hàng" : "Xuất hàng";
      },
    },
    {
      field: "createdBy",
      headerName: "Người nhập/xuất",
      width: 150,
      renderCell: (params) => {
        return params?.row?.createdBy.username;
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày nhập/xuất",
      width: 150,
      renderCell: (params) => {
        return dayjs(params?.row?.createdAt).format("DD/MM/YYYY HH:mm:ss");
      },
    },
  ];

  const renderDataGrid = () => {
    const ieList = imexport.imexports.map((item, index) => {
      return {
        id: index,
        ...item,
      };
    });
    return (
      <Box height="70vh">
        <DataGrid
          columns={columns}
          rows={ieList}
          rowsPerPageOptions={[10]}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    );
  };

  return (
    <Layout sidebar>
      <Typography variant="h5" marginY={2}>
        Lịch sử nhập xuất hàng
      </Typography>
      {renderDataGrid()}
    </Layout>
  );
};

export default ImportExport;
