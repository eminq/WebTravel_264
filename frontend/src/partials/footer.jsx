import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center py-1 fixed-bottom">
      <p className='mt-2'>
        &copy; {new Date().getFullYear()} Travel.com
      </p>
    </footer>
  );
};

export default Footer;