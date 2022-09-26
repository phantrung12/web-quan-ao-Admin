import { Button, Table } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { getAllUser } from "../redux/actions/user.actions";

const UserPage = () => {
  const users = useSelector((state) => state.user.userList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  return (
    <Layout sidebar>
      <Table style={{ fontSize: 14 }}>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((prod, index) => (
            <tr key={prod._id}>
              <td>{index}</td>
              <td>{prod.firstName}</td>
              <td>{prod.lastName}</td>
              <td>{prod.email}</td>
              <td>{prod.role}</td>
              <td>
                <Button variant="contained" color="primary">
                  Info
                </Button>
                <Button variant="contained" color="primary">
                  Update
                </Button>
                <Button variant="contained" color="secondary">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default UserPage;
