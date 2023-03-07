import Sidebar from './Sidebar';
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import "./dashboard.css";
import { Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAdminProducts } from '../../actions/productAction';
import { getAllOrders } from '../../actions/orderAction';
import { allUsers } from '../../actions/userAction';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { products} = useSelector(state => state.products);
    const { orders } = useSelector(state => state.allOrders);
    const { users } = useSelector(state => state.allUsers);
    let outOfStock = 0;
    products?.forEach((item) => {
        if(item.stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAllOrders());
        dispatch(allUsers());
    }, [dispatch])

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 92, 49)"],
                data: [0, 4000]
            }
        ]
    }

    const doughnutState = {
        labels: ["Out of Stocks", "In Stocks"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products.length - outOfStock]
            }
        ]
    }
  return (
    <div className="dashboard">
        <div>
        <Sidebar />
        </div>
        <div className="dashboardContainer">
            <Typography component='h1'>Dahsboard</Typography>
            <div className="dashboardSummary">
                <div>
                    <p>Total amount <br /> $2000 </p>
                </div>
                <div className="dashboardSummaryBox2">
                    <Link to="/admin/products">
                        <p>Product</p>
                        <p>{products?.length}</p>
                    </Link>
                    <Link to="/admin/orders">
                        <p>Orders</p>
                        <p>{orders?.length}</p>
                    </Link>
                    <Link to="/admin/users">
                        <p>Users</p>
                        <p>{users.length}</p>
                    </Link>
                </div>
            </div>

            <div className="lineChart">
                <Line 
                    data={lineState}
                />
            </div>

            <div className="doughnutChart">
                <Doughnut 
                data={doughnutState} />
            </div>

        </div>
    </div>
  )
}

export default Dashboard