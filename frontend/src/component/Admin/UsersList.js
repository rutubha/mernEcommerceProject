import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { clearErrors, allUsers, deleteUser } from './../../actions/userAction';
import MetaData from "./../layout/MetaData";
import Sidebar from "./Sidebar";
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, users} = useSelector((state) => state.allUsers);
  const { error: deletedError, isDeleted} = useSelector((state) => state.profile);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(deletedError) {
        alert.error(deletedError);
        dispatch(clearErrors());
    }

    if(isDeleted) {
        alert.success("User deleted successfully");
        dispatch({type: DELETE_USER_RESET});
    }
    dispatch(allUsers());
  }, [dispatch, error, alert, deletedError, isDeleted]);

  const deleteUserHandler = (id) => {
      dispatch(deleteUser(id));
  }
  const columns = [
    { field: "id", headerName: "User Id", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "email",
      headerName: "Email",
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 0.3,
      type: "Number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>
            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  users?.forEach((user) => {
    rows.push({
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
    });
  });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - ADMIN`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;