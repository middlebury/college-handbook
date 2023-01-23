import React from "react";
import MiddLogo from "../images/midd-shield.svg";
import { withPrefix } from "gatsby";

const Header = () => {
  return (
    <header className="app-header">
      <div className="app-header__wrap app-header__wrap--main">
        <div className="app-header__logo">
          <a href="/handbook">
            <img
              src={withPrefix(MiddLogo)}
              sizes="(min-width: 1024px) 67px, 44px"
              alt="Middlebury Shield"
            />
          </a>
        </div>

        <h1 className="app-header__title" id="midd-app-header-label">
          <a href="/handbook" className="app-header__link">
            Middlebury Handbook
          </a>
        </h1>
      </div>
    </header>
  );
};

export default Header;
