import React from 'react'
import { Link } from 'react-router-dom'
import "./Sidebar.css"
import { Add, Dashboard, ExpandMore, ImportExport, List, People, PostAdd, RateReview } from '@material-ui/icons';
import { TreeItem, TreeView } from '@material-ui/lab';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <Link to="/admin/dashboard">
            <p>
                <Dashboard /> Dashboard
            </p>
        </Link>
        <Link to="/admin/dashboard">
            <TreeView
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ImportExport />}
            >
                <TreeItem nodeId='1' label='products'>
                    <Link to="/admin/products" >
                        <TreeItem nodeId='2' label="all" icon={<PostAdd />} />
                    </Link>
                    <Link to="/admin/product" >
                        <TreeItem nodeId='3' label="Create" icon={<Add />} />
                    </Link>
                </TreeItem>
            </TreeView>
        </Link>
        <Link to="/admin/orders">
            <p>
                <List /> Orders
            </p>
        </Link>
        <Link to="/admin/users" >
            <p>
                <People />Users
            </p>
        </Link>
        <Link to="/admin/reviews">
            <p>
                <RateReview />Reviews
            </p>
        </Link>
    </div>
  )
}

export default Sidebar