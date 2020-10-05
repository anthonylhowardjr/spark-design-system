import React from 'react';
import PropTypes from 'prop-types';
import Layout from './Layout';

function PrinciplesLayout({ children, location }) {
  return (
    <Layout initialContext="principles" location={location}>
      {children}
    </Layout>
  );
}

PrinciplesLayout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.string,
};

export default PrinciplesLayout;
