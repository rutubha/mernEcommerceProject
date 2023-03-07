import { Typography } from "@material-ui/core";
import { RemoveShoppingCart } from "@material-ui/icons";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItemsToCart } from "../../actions/cartAction";
import "./Cart.css";
import CartItemCard from "./CartItemCard";

const Cart = ({ history }) => {
  const disptach = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    if (stock <= quantity) {
      return;
    }
    const qty = quantity + 1;
    disptach(addItemsToCart(id, qty));
  };

  const decreaseQuantity = (id, quantity) => {
    if (1 >= quantity) {
      return;
    }
    const qty = quantity - 1;
    disptach(addItemsToCart(id, qty));
  };

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCart />
          <Typography>No product in cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Sub Total</p>
            </div>
            {cartItems?.map((item) => (
              <div className="cartContainer" key={item.product}>
                <CartItemCard item={item} key={item.product} />
                <div className="cartInput">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.product, item.quantity)
                    }
                  >
                    -
                  </button>
                  <input type="number" value={item.quantity} readOnly />
                  <button
                    onClick={() =>
                      increaseQuantity(item.product, item.quantity, item.stock)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="cartSubTotal">{`$${
                  item.price * item.quantity
                }`}</div>
              </div>
            ))}
            <div className="cartTotal">
              <div></div>
              <div className="cartTotalBox">
                <p>Total</p>
                <p>{`$${cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>Check out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
