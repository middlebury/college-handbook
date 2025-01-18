import React from "react";
import Homepage from "../components/homepage";
import netlifyIdentity from 'netlify-identity-widget';

window.netlifyIdentity = netlifyIdentity;
netlifyIdentity.init();

const IndexPage = () => {
  return <Homepage></Homepage>;
};

export default IndexPage;
