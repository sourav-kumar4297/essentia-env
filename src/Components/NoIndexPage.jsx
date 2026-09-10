import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';

const NoIndexPage = () => {
  return (
    <>
      <Helmet>
        {/* Ye tag Google ko page index karne se rokta hai */}
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
    </>
  );
};

export default NoIndexPage;