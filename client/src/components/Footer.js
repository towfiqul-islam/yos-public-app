import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AppContext from '../context/appContext';

const Footer = () => {
  const appContext = useContext(AppContext);
  const {isMobileSearchOpen} = appContext;
  return (
    <footer
      className={`py-4  bg-gray-900 text-gray-100 mt-8 ${
        isMobileSearchOpen && 'hidden'
      }`}
    >
      <div className='flex justify-center'>
        <ul className='flex flex-wrap justify-center py-4 text-sm sm:text-base'>
          <li className='mr-8 sm:mr-12 mb-4 sm:mb-0'>
            <Link to='/about-us'>About us</Link>
          </li>
          <li className='mr-8 sm:mr-12  mb-4 sm:mb-0'>
            <Link to='/privacy-policy'>Privacy policy</Link>
          </li>
          <li className=''>
            <Link to='/terms-and-conditions'>Terms & Conditions</Link>
          </li>
        </ul>
      </div>
      <p className='text-center sm:pt-4 pb-4'>
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
      <p className='text-center  pb-8'>
        Find us at:{' '}
        <a
          style={{color: '#0D8CF0'}}
          href='https://www.facebook.com/Yoshealth'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-300 font-medium  cursor-pointer underline'
        >
          facebook
        </a>
      </p>
      <div className='flex justify-center border-t border-gray-700 pt-2'>
        <p className='text-center  '>
          Copyright &#169; {new Date().getFullYear()} yos.com.bd
        </p>
      </div>
    </footer>
  );
};

export default Footer;
