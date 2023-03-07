import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { clearErrors, deleteProduct, getAdminProducts } from "./../../actions/productAction";
import MetaData from "./../layout/MetaData";
import Sidebar from "./Sidebar";
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, products } = useSelector((state) => state.products);
  const { error: deletedError, deleted} = useSelector((state) => state.deleteProduct);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(deletedError) {
        alert.error(deletedError);
        dispatch(clearErrors());
    }

    if(deleted) {
        alert.success("Product deleted successfully");
        dispatch({type: DELETE_PRODUCT_RESET});
    }
    dispatch(getAdminProducts());
  }, [dispatch, error, alert, deletedError, deleted]);

  const deleteProductHandler = (id) => {
      dispatch(deleteProduct(id));
  }
  const columns = [
    { field: "id", headerName: "Product ID",  flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "stock",
      headerName: "Stock",
      
      flex: 0.3,
      type: "Number",
    },
    {
      field: "price",
      headerName: "Price",
      
      flex: 0.5,
      type: "Number",
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>
            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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
  products?.forEach((item) => {
    rows.push({
      id: item._id,
      stock: item.stock,
      price: item.price,
      name: item.name,
    });
  });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - ADMIN`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
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

export default ProductList;
