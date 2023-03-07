import React from 'react';
import Appstore from "../../../images/Appstore.png";
import Playstore from "../../../images/playstore.png";
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftFooter">
            <h4>Download our app</h4>
            <p>Download app for android and iOS mobile phone</p>
            <img src={Appstore} alt="" />
            <img src={Playstore} alt="" />
        </div>
        <div className="midFooter">
            <h1>Ecommerce</h1>
            <p>High quality is our first priority</p>
            <p>Copyright 2023 &copy; Ecommerce</p>
        </div>
        <div className="rightFooter">
            <h4>FOLLOW US</h4>
            <a href="http://instagram.com/">Instagram</a>
            <a href="http://facebook.com/">Facebook</a>
            <a href="http://twitter.com/">Twitter</a>
        </div>
    </footer>
  )
}

export default Footer