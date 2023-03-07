import React from "react";
import "./CartitemCard.css";
import { Link } from "react-router-dom";
import { removeItemsFromCart } from "../../actions/cartAction";
import { useDispatch } from "react-redux";

const CartItemCard = ({ item }) => {
    const disptach = useDispatch();
    const removeItem = (id) => {
        disptach(removeItemsFromCart(id));
    }
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: $${item.price}`}</span>
        <p onClick={() => removeItem(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
