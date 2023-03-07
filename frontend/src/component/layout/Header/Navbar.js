import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
  Typography,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import { Search, PersonOutline, ShoppingBasket } from "@material-ui/icons";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions";

const useStyles = makeStyles((theme) => ({
  navlinks: { marginLeft: theme.spacing(10), display: "flex" },
  logo: { display: "flex", cursor: "pointer", flexGrow: 1 },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(3),
    "&:hover": { color: "yellow", borderBottom: "1px solid yellow" },
  },
  search: {
    display: "flex",
    flexGrow: "1",
    justifyContent: "end",
    marginRight: "2rem",
  },
  searchIcon: {
    cursor: "pointer",
  },
}));

function Navbar() {
  const classes = useStyles();
  const { isAuthenticated, user } = useSelector(state => state.user);

  return (
    <AppBar
      position="static"
      style={{ backgroundImage: "linear-gradient(to right, #635dc0, #3027ae)" }}
    >
      <CssBaseline />
      <Toolbar>
        <DrawerComponent />
        <Typography variant="h4" className={classes.logo}>
          Ecommerce
        </Typography>
        <Box className={classes.search}>
          <Link to="/search" className={classes.link}>
            <Search className={classes.searchIcon} size="large" />
          </Link>
          <Link to="/cart" className={classes.link}>
            <ShoppingBasket className={classes.searchIcon} size="large" />
          </Link>
          <Link to="/login" className={classes.link}>
            <PersonOutline className={classes.searchIcon} size="large" />
          </Link>
        </Box>
        {isAuthenticated ? (
          <Box minWidth="60px">
            <UserOptions user={user} />
          </Box>) : ""}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
