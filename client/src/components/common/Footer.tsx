import React from 'react';
import './style.scss';

const copyrightYear = () => {
  const date = new Date();
    const year = date.getFullYear();
  return year;
};

const Footer = () => (
    <div className="footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <p>&copy;&nbsp;CML {copyrightYear()}.</p>
    </div>
  );

export default Footer;
