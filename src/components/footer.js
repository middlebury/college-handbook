import React from "react";
import { Link } from "gatsby";

const Footer = () => {
    return (
        <div className="footer">
            <Link to="/admin/#/">
                <h3>Site editor login</h3>
            </Link>
        </div>
    );
};

export default Footer;