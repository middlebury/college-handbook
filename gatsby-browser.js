import React from 'react';
import PageWrapper from './src/components/page-wrapper';

export const wrapPageElement = ({ element, props }) => {
    return (
        <PageWrapper {...props}>
            {console.log(props)}
            {element}
        </PageWrapper>
    );
};