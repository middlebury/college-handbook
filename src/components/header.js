import React from "react";
import CollegeLogo from "../images/college-logo.svg";

const Header = () => {
    return (
        <header className="global-header">
            <div>
                <a>
                    <img 
                        src={CollegeLogo}
                        sizes="(min-width: 1280px) 180px, 120px"
                        alt="Logo for Middlebury College"
                        className="d-none d-sm-block"
                    />                 
                </a>
            </div>
        </header>
    );
};

export default Header;