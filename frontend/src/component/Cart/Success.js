import { Typography } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import "./Success.css";

const Success = () => {
  return (
    <div className="orderSuccess">
        <CheckCircle />
        <Typography>Your Order has been placed successfully</Typography>
        <Link to="/orders">View Orders</Link>
    </div>
  )
}

export default Success