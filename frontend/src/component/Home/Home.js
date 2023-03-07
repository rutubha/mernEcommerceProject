import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import MetaData from "../layout/MetaData";
import "./Home.css";
import Product from "./ProductCard.js";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products} = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Ecommerce" /> {/* title of the page */}
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS HERE</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Product</h2>
          <div className="container" id="container">
            {products &&
              products.map((product, index) => (
                <Product key={index} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
