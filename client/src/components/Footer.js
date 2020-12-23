import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='py-4  bg-gray-900 text-gray-100 mt-8'>
      <div className='flex justify-center'>
        <ul className='flex flex-wrap justify-center py-4 text-sm sm:text-base'>
          <li className='mr-8 sm:mr-12 mb-4 sm:mb-0'>
            <Link to='/about-us'>About us</Link>
          </li>
          <li className='mr-8 sm:mr-12  mb-4 sm:mb-0'>
            <Link to='/about-us'>Privacy policy</Link>
          </li>
          <li className=''>
            <Link to='/about-us'>Terms & Conditions</Link>
          </li>
        </ul>
      </div>
      <p className='text-center sm:pt-4 pb-8'>
        Contact:{' '}
        <span
          onClick={() => {
            window.location.href =
              'mailto:support@yos.com.bd?subject=Subject&body=message%20goes%20here';
          }}
          className='text-yellow-400 font-medium border-b border-yellow-400 cursor-pointer'
        >
          support@yos.com.bd
        </span>
      </p>
      <p className='text-center border-t border-gray-700 pt-4'>
        Copyright &#169; {new Date().getFullYear()} yos.com.bd
      </p>
    </footer>
  );
};

export default Footer;
