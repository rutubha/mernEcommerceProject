import { Typography } from "@material-ui/core";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "./../layout/MetaData";
import CheckoutStep from "./CheckoutStep";
import "./ShippingConfirm.css";

const ShippingConfirm = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}, ${shippingInfo.pinCode}`;

  const proccedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/process/payment");
  };

  return (
    <Fragment>
      <MetaData titel={`Confirm order`} />
      <CheckoutStep activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name: </p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone no: </p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address: </p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems?.map((item) => (
                <div key={item.product}>
                  <img src={item.image} alt="Cart item" />
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <span>
                    {item.quantity} X {item.price} ={" "}
                    <b>${item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order summery</Typography>
            <div>
              <div>
                <p>Subtotal</p>
                <span>${subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges</p>
                <span>${shippingCharges}</span>
              </div>
              <div>
                <p>GST : </p>
                <span>${tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total : </b>
              </p>
              <span>${totalPrice}</span>
            </div>
            <button onClick={proccedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShippingConfirm;
