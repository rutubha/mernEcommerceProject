import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import {
  clearErrors,
  getAllReviews,
  deleteReview,
} from "./../../actions/productAction";
import MetaData from "./../layout/MetaData";
import Sidebar from "./Sidebar";
import "./ProductReviews.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { Delete, Star } from "@material-ui/icons";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, reviews } = useSelector((state) => state.productReviews);
  const { error: deletedError, isDeleted } = useSelector(
    (state) => state.review
  );
  const [productId, setProductId] = useState("");

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deletedError) {
      alert.error(deletedError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review deleted successfully");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, alert, deletedError, isDeleted, productId]);

  const deleteProductReviewHandler = (reviewId, productId) => {
    dispatch(deleteReview(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  const columns = [
    { field: "id", headerName: "Review ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 0.7 },
    {
      field: "comment",
      headerName: "Comment",
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
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
            <Button
              onClick={() =>
                deleteProductReviewHandler(
                  params.getValue(params.id, "id"),
                  productId
                )
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
  reviews?.forEach((item) => {
    rows.push({
      id: item._id,
      rating: item.rating,
      comment: item.comment,
      name: item.name,
    });
  });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - ADMIN`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            encType="multipart/form-data"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">Product Reviews</h1>
            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <Button
              id="reviewProductBtn"
              type="submit"
              disabled={productId === "" ? true : false}
            >
              View Review
            </Button>
          </form>
          {reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productReviewsTable"
              autoHeight
            />
          ) : (
            <h1>No reviews</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
