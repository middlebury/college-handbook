import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

import '../styles/main.scss';

const Layout = ({ title, children }) => {
    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title 
                        description
                    }
                }
            }
        `
    );
    
    // const { title } = data.site.siteMetadata;
   
    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={data.site.siteMetadata.description} />
                <link 
                    href="https://fonts.googleapis.com/css?family=Domine:400|Open+Sans:400,700"
                    rel="stylesheets"
                    type="text/css"
                />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
            </Helmet>
            {children}
        </div>
    );
};

// Layout.propTypes = {
//     children: PropTypes.func
// };

export default Layout; 